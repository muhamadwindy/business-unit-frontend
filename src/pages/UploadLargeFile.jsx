import axios from 'axios';
import { useForm } from 'react-hook-form';
import API_ENDPOINT from '../globals/api-endpoint';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const chunkSize = 1048576 * 3; //3 artinya ki berapa anda ingin membuat limit per file e,
const UploadLargeFilePage = () => {
  const { userToken } = useSelector((state) => state.auth);
  const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState({});
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [guid, setGuid] = useState('');
  const [fileGuid, setFileGuid] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileNameOri, setFileNameOri] = useState(0);
  const [description, setDescription] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const progressInstance = (
    <progress
      className="progress progress-flat-secondary w-full mt-2"
      value={progress}
      max="100"></progress>
  );

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
  }, [fileToBeUpload, progress]);

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      uploadChunk(chunk);
    }
  };

  const uploadChunk = async (chunk) => {
    const formData = new FormData();
    formData.append('ChunkId', counter);
    formData.append('File', chunk);
    formData.append('Id', fileGuid);
    formData.append('Description', 'Tes Data Chunk');
    try {
      const response = await axios.post(API_ENDPOINT.DOC_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userToken}`,
        },
      });
      const data = response.data;
      if (data.status) {
        setBeginingOfTheChunk(endOfTheChunk);
        setEndOfTheChunk(endOfTheChunk + chunkSize);
        if (counter == chunkCount) {
          console.log(
            'iki kanggo ngecek :Process is complete, counter',
            counter
          );

          await uploadCompleted();
        } else {
          var percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal Saat Mencoba Upload Dokumen',
        });
      }
    } catch (error) {
      let message = '';
      if (error.response && error.response.status) {
        message =
          error.response.status === 403
            ? 'User tidak terotorisasi digunakan untuk aksi ini'
            : error.response.message;
      } else {
        message = error.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: message,
      });
    }
  };

  const uploadCompleted = async () => {
    const response = await axios.post(
      API_ENDPOINT.DOC_UPLOAD + 'completed',
      {
        Id: guid,
        FileName: fileNameOri,
        Description: description,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userToken}`,
        },
      }
    );

    const data = response.data;
    if (data.status) {
      setProgress(100);
      setTimeout(() => {
        setShowProgress(false);
      }, 2500);
      Swal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Upload Berhasil',
      });
      reset({ data: null });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Upload Gagal',
        text: data.message,
      });
    }
  };

  const resetChunkProperties = () => {
    setShowProgress(true);
    setProgress(0);
    setCounter(1);
    setBeginingOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const validFileExtensions = ['pdf', 'xlsx'];
    const fileName = data.document[0].name.toLowerCase();
    const fileExt = fileName.split('.')[1];

    if (!validFileExtensions.includes(fileExt)) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Ekstensi Yang diperboblehkan adalah PDF dan xlsx',
      });
      reset({ data: null });
      return;
    }
    /* begin */

    resetChunkProperties();
    const file = data.document[0];
    setFileNameOri(data.document[0].name);
    setDescription(data.description);
    setFileSize(file.size);

    const _totalCount =
      file.size % chunkSize == 0
        ? file.size / chunkSize
        : Math.floor(file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
    setChunkCount(_totalCount);

    setFileToBeUpload(file);
    const Id = uuidv4();
    setFileGuid(Id + '.' + file.name.split('.').pop());
    setGuid(Id);

    /* end */
    return;
  };

  return (
    <div className="max-w-screen-sm">
      <h1 className="mb-4 block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
        Upload Document
      </h1>
      <div className="mb-2">
        <label
          htmlFor="input-label"
          className="block text-sm font-medium mb-2 dark:text-white">
          Description
        </label>
        <input
          {...register('description', { required: true })}
          type="text"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Write description..."></input>

        {errors.description && (
          <span className="text-xs text-red-700">Description is required</span>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2 dark:text-white">
            Document
          </label>
          <div>
            <label htmlFor="document" className="sr-only">
              Choose file
            </label>
            <input
              {...register('document', { required: true })}
              type="file"
              className="block w-full border border-gray-200 bg-white 
  shadow-sm rounded-lg text-sm focus:z-10 focus:border-indigo-500 focus:ring-indigo-500
   disabled:opacity-50 disabled:pointer-events-none  
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4 "
            />
            {errors.document && (
              <span className="text-xs text-red-700">Document is required</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold 
          rounded-lg border border-transparent bg-indigo-700 text-white 
          hover:bg-indigo-900 disabled:opacity-50 
          disabled:pointer-events-none">
            Upload
          </button>
          <div className={showProgress ? 'block' : 'hidden'}>
            {progressInstance}
          </div>
        </div>
      </form>
    </div>
  );
};
export default UploadLargeFilePage;
