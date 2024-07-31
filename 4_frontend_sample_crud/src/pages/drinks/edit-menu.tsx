import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Menu } from "../../lib/models";
import Loading from "../../components/loading";
import Layout from "../../components/layout";

export default function EditMenuById() {
    const { menuId } = useParams();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);

    const { data: menu, isLoading, error } = useSWR<Menu>(`/menus/${menuId}`);
    const [isSetInitialValues, setIsSetInitialValues] = useState(false);
    console.log(menuId)
    const menuEditForm = useForm({
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

    const handleSubmit = async (values: typeof menuEditForm.values) => {
        try {
            setIsProcessing(true);
            await axios.put(`/editmenu/${menuId}`, values);
            notifications.show({
                title: "แก้ไขข้อมูลหนังสือสำเร็จ",
                message: "ข้อมูลหนังสือได้รับการแก้ไขเรียบร้อยแล้ว",
                color: "teal",
            });
            navigate("/menus");
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    notifications.show({
                        title: "ไม่พบข้อมูลหนังสือ",
                        message: "ไม่พบข้อมูลหนังสือที่ต้องการแก้ไข",
                        color: "red",
                    });
                } else if (error.response?.status === 422) {
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

    const handleDelete = async () => {
        try {
            setIsProcessing(true);
            await axios.delete(`/deletemenu/${menuId}`);
            notifications.show({
                title: "ลบรายการสำเร็จ",
                message: "ลบรายการนี้ออกจากระบบเรียบร้อยแล้ว",
                color: "red",
            });
            navigate("/menus");
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    notifications.show({
                        title: "ไม่พบข้อมูลรายการนี้",
                        message: "ไม่พบข้อมูลรายการที่ต้องการลบ",
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

    useEffect(() => {
        if (!isSetInitialValues && menu) {
            menuEditForm.setInitialValues(menu);
            menuEditForm.setValues(menu);
            setIsSetInitialValues(true);
        }
    }, [menu, menuEditForm, isSetInitialValues]);

    return (
        <>
            <Layout>
                <Container className="mt-8">
                    <h1 className="text-xl">แก้ไขข้อมูลรายการเครื่องดื่ม</h1>

                    {isLoading && !error && <Loading />}
                    {error && (
                        <Alert
                            color="red"
                            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
                            icon={<IconAlertTriangleFilled />}
                        >
                            {error.message}
                        </Alert>
                    )}

                    {!!menu && (
                        <>
                            <form onSubmit={menuEditForm.onSubmit(handleSubmit)} className="space-y-8">
                                <TextInput
                                    label="ชื่อรายการเครื่องดื่ม"
                                    placeholder="ชื่อรายการเครื่องดื่ม"
                                    {...menuEditForm.getInputProps("menu_name")}
                                />

                                <TextInput
                                    label="รูปเครื่องดื่ม"
                                    placeholder="รูปเครื่องดื่ม"
                                    {...menuEditForm.getInputProps("img_url")}
                                />

                                <NumberInput
                                    label="ราคาเครื่องดื่ม"
                                    placeholder="ราคาเครื่องดื่ม"
                                    {...menuEditForm.getInputProps("price")}
                                />

                                <NumberInput
                                    label="เรตติ้ง"
                                    placeholder="เรตติ้ง"
                                    max={5}
                                    {...menuEditForm.getInputProps("rating")}
                                />

                                <Divider />

                                <div className="flex justify-between">
                                    <Button
                                        color="red"
                                        leftSection={<IconTrash />}
                                        size="xs"
                                        onClick={() => {
                                            modals.openConfirmModal({
                                                title: "คุณต้องการลบหนังสือเล่มนี้ใช่หรือไม่",
                                                children: (
                                                    <span className="text-xs">
                                                        เมื่อคุณดำนเนินการลบหนังสือเล่มนี้แล้ว จะไม่สามารถย้อนกลับได้
                                                    </span>
                                                ),
                                                labels: { confirm: "ลบ", cancel: "ยกเลิก" },
                                                onConfirm: () => {
                                                    handleDelete();
                                                },
                                                confirmProps: {
                                                    color: "red",
                                                },
                                            });
                                        }}
                                    >
                                        ลบหนังสือนี้
                                    </Button>

                                    <Button type="submit" loading={isLoading || isProcessing}>
                                        บันทึกข้อมูล
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </Container>
            </Layout>
        </>
    );
}
