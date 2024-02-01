import { createSlice } from "@reduxjs/toolkit";
import { ModalProps } from "../../components/Modal";

const initialState: ModalProps = {
    title: '',
    type: '',
    visible: false,
    props: {}
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action?) {
            return { ...action?.payload, visible: true };
        },
        closeModal(state) {
            return { ...state, visible: false };
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;