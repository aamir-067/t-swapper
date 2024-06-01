import React from 'react'
import { tokens } from '../tokens'

const Inputs = () => {

    return (
        <div className='border-2 border-black rounded-md w-4/12 flex justify-center py-4 my-4'>
            <div className='flex flex-col w-9/12 gap-2 '>
                <div className='flex justify-between border-2 rounded-sm border-black/30'>
                    <input
                        className="flex h-10 w-10/12 rounded-md border bg-transparent px-3 py-2 border-none text-sm placeholder:text-gray-600 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Token0"
                    />

                    <select defaultValue={""}>
                        <option value={""}>Select Token</option>
                        {
                            tokens.map((token: string, index: number) => {
                                return <option key={index} value={token}>{token}</option>
                            })
                        }
                    </select>
                </div>
                <h2 className='capitalize text-center font-bold'>to</h2>
                <div className='flex justify-between border-2 rounded-sm border-black/30'>
                    <input
                        className="flex h-10 w-10/12 rounded-md border bg-transparent px-3 py-2 border-none text-sm placeholder:text-gray-600 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        readOnly
                        value={9}
                        placeholder="Token0"
                    />

                    <select defaultValue={""}>
                        <option value={""}>Select Token</option>
                        {
                            tokens.map((token: string, index: number) => {
                                return <option key={index} value={token}>{token}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div >
    )
}

export default Inputs