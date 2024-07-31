import { useState } from 'react'
import Layout from '../../components/layout'
import useSWR from 'swr'
import { Alert, Button } from '@mantine/core'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import Loading from '../../components/loading'
import { Menu, OrderMenu } from '../../lib/models'
import axios from 'axios'
import { notifications } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { MdStar } from "react-icons/md";

const Menus = () => {
    const { data: menus, error } = useSWR<Menu[]>("/menus")
    const { data: ordermenus } = useSWR<OrderMenu[]>("/ordermenu")
    const [count, setCount] = useState(1)
    const negativeNum = (num: number) => {
        num < 2 ? setCount(1) : setCount(num - 1)
    }
    async function AddMenu(id: number) {
        const values = {
            menu_id: id,
            count: count
        }
        try {
            const findMenuExists = ordermenus?.find((data) => data.menu_id == id)
            if (findMenuExists) {
                const res = await axios.put<OrderMenu>(`/updateorder`, values)
                notifications.show({
                    title: "เพิ่มเครื่องดื่มสำเร็จ",
                    message: "ข้อมูลถูกเพิ่มไปยังตะกร้าแล้วแจ้",
                    color: "teal",
                });
                console.log(res)
            } else {
                const response = await axios.post<OrderMenu>(`/createorder`, values);
                notifications.show({
                    title: "สั่งเครื่องดื่มสำเร็จ",
                    message: "ข้อมูลถูกส่งไปยังตะกร้าแล้วแจ้",
                    color: "teal",
                });
                console.log(response)
                window.location.reload()
            }

        } catch (err) {
            console.error(err)
        }
    }
    return (
        <Layout>
            <div className='m-10 mb-5 flex justify-end px-10 '>
                <Link to={"/add-menu"}>+ Add Menu +</Link>
                <Link to={"/staff"} className='ml-5'>Cart</Link>
            </div>
            {!menus && !error && <Loading />}
            {error && (
                <Alert
                    color="red"
                    title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
                    icon={<IconAlertTriangleFilled />}
                >
                    {error.message}
                </Alert>
            )}
            <div className='m-10 p-4 border-black border h-full bg-red-100 grid grid-cols-4 gap-10'>
                {
                    menus && menus.map((data) => {
                        const ratingArray = Array(data.rating).fill(data.rating)
                        return <>
                            <div key={data.id + 100} className='h-[450px] gap-2 flex flex-col'>
                                <div className='h-[300px]'>
                                <img src={`${data.img_url}`} alt="" className='h-[300px] w-full object-cover bg-cover' />
                                </div>
                                
                                <div className='flex justify-between'>
                                    <p className='font-bold text-[24px]'>{data.menu_name}</p>
                                </div>
                                <p>Price: {data.price} Baht</p>
                                <div className='flex justify-between'>
                                    <div className='flex'>
                                        {ratingArray.map((index) => (
                                            <div key={index}><MdStar className='w-6 h-6 text-yellow-400' /></div>
                                        ))}
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='h-6 w-6 rounded-full flex justify-center items-center mb-1' onClick={() => negativeNum(count)}>-</button>
                                        <p>{count}</p>
                                        <button className='h-6 w-6 rounded-full flex justify-center items-center mb-1' onClick={() => setCount(count + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='flex items-center '>
                                    <Link to={`/menus/${data.id}`} className='p-2' ><Button className='w-1/2'>Edit & Delete</Button></Link>
                                    <Button className='p-2 w-1/2' onClick={() => AddMenu(data.id)}>Select</Button>
                                </div>
                            </div>
                        </>
                    })
                }
            </div>

        </Layout>

    )
}

export default Menus