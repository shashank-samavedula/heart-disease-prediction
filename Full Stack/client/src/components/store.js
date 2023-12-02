import React, { useEffect,useState } from 'react'
import { Input, Button, Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Web3Storage } from 'web3.storage'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZFYjEwOUExYzVGNkU2NzQ1MmREMDA1OTM3NEUzMTg3NkQ0ODMwNjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTg5MjEzNjgyMzYsIm5hbWUiOiJXZWxsbmVzcyJ9.vwMQH5jqqnEWKpypAEgL3wvPQKtbqNF5jXK2YjreZyI'
const client = new Web3Storage({ token })

const Store = ({ handleChange }) => {
    const [file, setFile] = useState(null)
    const [fileUrl, setFileUrl] = useState('')
    const [cid, setCid] = useState('')

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (e) => {
        if (!file) { alert('Upload was not successful') }

        try {
            const response = await client.put([file])

            setCid(response)
            setFileUrl('https://w3s.link/ipfs/' + response)
        } catch (error) {
            console.error('Error uploading to IPFS:', error)
        }
    }

    const downloadFile = async (e) => {
        if (!fileUrl) { alert('Upload a file first') }

        try {
            const response = await client.get(cid)
            const files = await response.files()
            const url = window.URL.createObjectURL(new Blob(files))
            
            for (const file of files) {
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${file.name}`)
                document.body.appendChild(link)
                link.click()
                link.remove()
            }
        } catch (error) {
            console.error('Error downloading from IPFS:', error)
        }
    }

    useEffect(() => {
        handleChange(cid)
    },[cid, handleChange])

    return (
        <div>
            <Input type="file" name="uploadedFile" onChange={handleFileChange} />
            <Button onClick={uploadFile}>Upload to IPFS</Button>
            <Button onClick={downloadFile}>Download from IPFS</Button>
            {fileUrl &&
                <div>
                    File URL:
                    <Link
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        name="uploadedFile"
                    >
                        {cid}<OpenInNewIcon fontSize="small" />
                    </Link>
                </div>
            }
        </div>
    )
}

export default Store