import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import { Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Menu } from "../../lib/models";

export default function CreateMenuPage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const menuCreateForm = useForm({
    initialValues: {
      menu_name: "",
      img_url: "",
      price: 0,
      rating: 0,
    },

    validate: {
      menu_name: isNotEmpty("กรุณาระบุชื่อเมนู"),
      img_url: isNotEmpty("กรุณาระบุลิ้งค์รูปภาพ"),
      price: isNotEmpty("กรุณาระบุราคา"),
      rating: isNotEmpty("กรุณาระบุเรตติ้ง")
    },
  });

  const handleSubmit = async (values: typeof menuCreateForm.values) => {
    try {
      setIsProcessing(true);
      await axios.post<Menu>(`/createmenu`, values);
      notifications.show({
        title: "เพิ่มข้อมูลหนังสือสำเร็จ",
        message: "ข้อมูลหนังสือได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/menus`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Layout>
        <Container className="mt-8">
          <h1 className="text-xl">เพิ่มเครื่องดื่มในระบบ</h1>

          <form onSubmit={menuCreateForm.onSubmit(handleSubmit)} className="space-y-8">
            <TextInput
              label="ชื่อเครื่อง"
              placeholder="ชื่อเครื่อง"
              {...menuCreateForm.getInputProps("menu_name")}
            />

            <TextInput
              label="รูปประกอบ"
              placeholder="รูปประกอบ"
              {...menuCreateForm.getInputProps("img_url")}
            />

            <NumberInput
              label="ราคา"
              placeholder="ราคา"
              {...menuCreateForm.getInputProps("price")}
            />

            <NumberInput
              label="เรตติ้ง"
              placeholder="เรตติ้ง"
              max={5}
              {...menuCreateForm.getInputProps("rating")}
            />

            <Divider />

            <Button type="submit" loading={isProcessing}>
              บันทึกข้อมูล
            </Button>
          </form>
        </Container>
      </Layout>
    </>
  );
}