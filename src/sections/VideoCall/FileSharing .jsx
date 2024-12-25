import { useState, useEffect } from 'react';

const FileSharing = () => {
    const [files, setFiles] = useState([]); // قائمة الملفات
    const [selectedFile, setSelectedFile] = useState(null); // الملف الذي يختاره المستخدم

    useEffect(() => {
        // جلب قائمة الملفات من API
        fetch('https://api.japaneseacademy.online/files')
            .then((res) => res.json())
            .then((data) => setFiles(data))
            .catch((err) => console.error('Error fetching files:', err));
    }, []);

    // عند اختيار ملف
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // رفع الملف عند الضغط على زر الإرسال
    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('uploader_id', 'user-id'); // يمكن استبدال user-id بالمعرف الحقيقي

        try {
            const response = await fetch('https://api.japaneseacademy.online/uploads', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Failed to upload file: ${response.statusText}`);
            }

            const newFile = await response.json();
            setFiles((prevFiles) => [...prevFiles, newFile.file]); // تحديث قائمة الملفات
            setSelectedFile(null); // إعادة تعيين الملف المحدد
            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file. Please try again later.');
        }
    };

    return (
        <div className='FilesWeb'>
            <h3>مشاركة الملفات</h3>
            <input type="file" onChange={handleFileChange} />
            <button className='UploadFile' onClick={handleFileUpload}>رفع الملف</button> {/* زر الإرسال */}
            
            <ul className='containerFile'>
                {files.map((file) => (
                    <li key={file.id}>
                        {file.name}{' '}
                        <a className='DownloadFile' href={file.url} download>
                            تحميل
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileSharing;
