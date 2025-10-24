import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeComponent = () => {
  const qrRef = useRef();

  const downloadQRCode = () => {
    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'corcodusa-qr-code.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white">
      <div className="bg-white p-4">
        <QRCodeSVG
          value="https://corcodusa.ro/"
          size={400}
          level="H"
          includeMargin={true}
          ref={qrRef}
          fgColor="#000000"
          bgColor="#FFFFFF"
        />
      </div>
      <p className="text-center text-gray-700 font-semibold my-4">Scanați pentru a vizita corcodusa.ro</p>
      <button
        onClick={downloadQRCode}
        className="bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded"
      >
        Descarcă QR Code
      </button>
    </div>
  );
};

export default QRCodeComponent;