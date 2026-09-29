import axiosInstance from "../../../components/commonService/axiosInstance";


export async function SeatService(payload) {

    const response = await axiosInstance.post( "/admin/seats/generate" , payload);
    return response.data;

}