import React from 'react'

function CurrentTab({ fileInfo }) {

    let head = fileInfo && fileInfo[0].quality ? 'resolution' : 'file'

    return (
        fileInfo && fileInfo.length ?
            <div className='w-full'>
                <table className='w-full max-tablet:text-[3vw]'>
                    <tbody>
                        <tr>
                            {
                                [head, 'fileSize', 'download'].map((part, index) => (
                                    <th key={index} className='border border-zinc-600 p-1 capitalize'>{part}</th>
                                ))
                            }
                        </tr>
                        {
                            fileInfo.map((info) => (
                                <tr key={info.downloadLink}>
                                    <td className='border  border-zinc-600'>
                                        {head === 'resolution' ? info.quality : info.file}
                                    </td>
                                    <td className='border  border-zinc-600'>
                                        {info.size}
                                    </td>
                                    <td className='px-[2vw] py-[2vw] border  border-zinc-600'>
                                        <a href={info.downloadLink} className='bg-green-500 px-[2vw] py-[0.5vw] rounded-md'>Download</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div> : null
    )
}

export default CurrentTab
