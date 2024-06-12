import React, { useContext } from 'react'
import { tokens } from '../tokens'
import { userContext } from '../app/page'

const Inputs = () => {
    const { setInputToken, setRefresh, setOutputToken, inputToken, outputToken } = useContext(userContext);


    console.log(inputToken, outputToken);


    const handleChange = (e: React.FormEvent<HTMLSelectElement | HTMLInputElement>, whichOne: string, isInput: boolean) => {

        if (whichOne === "input") {

            if (isInput) {
                setInputToken({ ...inputToken, amount: Number(e.currentTarget.value) });
            } else {
                setInputToken({ ...inputToken, sign: e.currentTarget.value });
            }
            console.log("Input Changed : ", e.currentTarget.value);
        } else {
            setOutputToken({ ...outputToken, sign: e.currentTarget.value })
            console.log("Output Changed : ", e.currentTarget.value);
        }
        setRefresh(true);
    }


    return (
        <div className='border-2 border-black rounded-md w-4/12 flex justify-center py-4 my-4'>
            <div className='flex flex-col w-9/12 gap-2 '>
                <div className='flex justify-between border-2 rounded-sm border-black/30'>
                    <input
                        onChange={(e) => handleChange(e, "input", true)}
                        className="flex h-10 w-10/12 rounded-md border bg-transparent px-3 py-2 border-none text-sm placeholder:text-gray-600 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        value={inputToken.amount}
                        placeholder="Token0"
                    />

                    <select onChange={(e) => handleChange(e, "input", false)} defaultValue={""}>
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
                        value={outputToken?.amount}
                    />

                    <select onChange={(e) => handleChange(e, "output", false)} defaultValue={""}>
                        <option onChange={(e) => setOutputToken({ ...outputToken })} value={""}>Select Token</option>
                        {
                            tokens.map((token: string, index: number) => {
                                return token != inputToken?.sign && <option key={index} value={token}>{token}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div >
    )
}

export default Inputs