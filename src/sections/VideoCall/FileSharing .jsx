import { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";

const FileSharing = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const level = localStorage.getItem('showVideoCall');
        fetch(`https://api.japaneseacademy.jp/files?level=${level}`)
            .then((res) => res.json())
            .then((data) => setFiles(data))
            .catch((err) => console.error('Error fetching files:', err));
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const level = localStorage.getItem('showVideoCall');
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('uploader_id', 'user-id');
        formData.append('level', level);

        try {
            setIsUploading(true);
            setUploadProgress(0);
            
            const response = await fetch('https://api.japaneseacademy.jp/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        setUploadProgress(Math.round((event.loaded / event.total) * 100));
                    }
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Failed to upload file: ${response.statusText}`);
            }

            const newFile = await response.json();
            setFiles((prevFiles) => [...prevFiles, newFile.file]);
            setSelectedFile(null);
            setUploadProgress(0);
            setIsUploading(false);
            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again later.');
            setIsUploading(false);
        }
    };

    const handleFileDelete = async (id) => {
        try {
            const response = await fetch(`https://api.japaneseacademy.jp/files/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Failed to delete file: ${response.statusText}`);
            }

            setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
            alert('File deleted successfully.');
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Failed to delete file. Please try again later.');
        }
    };

    return (
        <div className='FilesWeb'>
            <h3>مشاركة الملفات</h3>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && <p>الملف المحدد: {selectedFile.name}</p>} 
            <button className='UploadFile' onClick={handleFileUpload} disabled={isUploading}>
                {isUploading ? 'جارٍ الرفع...' : 'مشاركة ملف'}
            </button>
            {isUploading && <progress value={uploadProgress} max="100"></progress>} 

            <ul className='containerFile'>
                {files.map((file) => (
                    <li key={file.id} className='mt-4 buttonsFiles'>
                        <a className='DownloadFile  text-center ms-3 p-2' href={file.url} target='_blank' download>
                            تنزيل الملف
                        </a>
                        <h5>{file.name}</h5>
                        {localStorage.getItem('userRole') === 'teacher' && (
                            <button className='deleteFiles' onClick={() => handleFileDelete(file.id)}>
                                <MdDelete />
                            </button>
                        )}
                        
        

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileSharing;