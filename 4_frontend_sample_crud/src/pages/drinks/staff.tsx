import useSWR from "swr";
import Layout from "../../components/layout";
import { Alert } from "@mantine/core";
import Loading from "../../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { Menu, OrderMenu } from "../../lib/models";
import { Link, useNavigate } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export default function StaffPage() {
  const navigate = useNavigate()
  const { data: ordermenu, error } = useSWR<OrderMenu[]>("/ordermenu")
  const { data: menu } = useSWR<Menu[]>("/menus")
  async function deleteMenu(id: number) {
    try {
      await axios.delete(`/ordermenu/${id}`)
      notifications.show({
        title: "ลบเมนูสำเร็จ",
        message: "ข้อมูลถูกลบจากยังตะกร้าแล้วแจ้",
        color: "teal",
      });
      navigate("/menus")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <Layout>
        <div className="m-10">
          <Link to={"/menus"}>ย้อนกลับ</Link>
        </div>
        {!ordermenu && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}
        {
          ordermenu && ordermenu.map((data, index) => {
            const hamenu: Menu | undefined = menu?.find((fs) => fs.id == data.menu_id)
            const ratingArray = Array(hamenu?.rating).fill(hamenu?.rating)
            return (
              <>
                <div key={index} className="m-10">
                  <div className="h-[400px] p-6 bg-gray-200 rounded-[24px] border-2 border-black flex relative">
                    <img src={`${hamenu?.img_url}`} alt="" className="h-[350px] w-1/2 object-cover rounded-[20px]" />
                    <div className="h-full w-1/2 py-8 px-16 flex flex-col gap-4">
                      <h1 className="text-4xl">{hamenu?.menu_name}</h1>
                      <h2 className="text-3xl">ราคา {hamenu ? hamenu.price * data.count : 0} บาท</h2>
                      <div className='flex'>
                        {ratingArray.map((index) => (
                          <div key={index}><MdStar className='w-10 h-10 text-yellow-400' /></div>
                        ))}
                      </div>
                      <h2 className="text-2xl">จำนวน {data.count} แก้ว</h2>
                      <button onClick={() => deleteMenu(data.id)} className="bg-transparent border-none">
                        <MdDelete className="w-10 h-10 text-red-600 hover:text-red-800 absolute bottom-10 right-10" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </Layout>
    </>
  );
}