import axios from 'axios';
import Swal from 'sweetalert2';
import API_ENDPOINT from '../globals/api-endpoint';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const MonitoringPages = () => {
  const { userToken } = useSelector((state) => state.auth);
  const [dataDocument, setDataDocument] = useState([]);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${userToken}`,
    },
  };

  const renderData = async () => {
    try {
      const result = await axios.get(API_ENDPOINT.DOC_GET, config);
      if (result.data.status) {
        setDataDocument(result.data.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Ambil Data',
          text: result.data.message,
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

  useEffect(() => {
    renderData();
  }, []);

  const downloadFile = async (document) => {
    const result = await axios.get(
      API_ENDPOINT.DOC_DOWNLOAD(document.id),
      config
    );
    if (!result.data.status) {
      console.log('download gagal');
    }
    const dataDownload = result.data.data;
    const fileName = dataDownload.fileName.toLowerCase();
    const fileNameSplitted = fileName.split('.');
    const fileExt = fileNameSplitted[fileNameSplitted.length - 1];

    const byteCharacters = atob(dataDownload.data); // Mengonversi base64 menjadi byte string

    // Mengonversi byte string ke array buffer
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type:
        fileExt == 'pdf'
          ? 'application/pdf'
          : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }); // Membuat blob dengan tipe file PDF
    const url = URL.createObjectURL(blob);

    // Membuat link untuk mengunduh file PDF
    const a = window.document.createElement('a');
    a.href = url;
    a.download = document.fileName; // Nama file saat diunduh
    window.document.body.appendChild(a);
    a.click();

    // Membersihkan URL yang telah digunakan
    setTimeout(() => {
      URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    }, 0);

    window.open(url);
  };
  return (
    <div className="max-w-screen">
      <h1 className="mb-4 block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
        Monitoring Document
      </h1>
      <div className="flex w-full overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>File Name</th>
              <th>Description</th>
              <th>Upload By</th>
              <th>Upload Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataDocument.map((document, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{document.fileName}</td>
                <td>{document.description}</td>
                <td>{document.uploadBy}</td>
                <td>{document.uploadDate}</td>
                <td>
                  <button
                    className="btn btn-solid-secondary"
                    onClick={() => downloadFile(document)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitoringPages;
