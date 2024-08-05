import { Component, onMount, Show } from "solid-js";
import { createSignal } from "solid-js";
import './AssetPopUpAssetAdd.css'
import { Flex } from "@hope-ui/solid"
import { Button, Input, InputGroup, InputLeftAddon, Alert, AlertIcon } from "@hope-ui/solid"
import { AiTwotoneCloseCircle } from 'solid-icons/ai'
import { fetchDataAssetKapalAdd } from "../../service/service";

type AssetPopUpAssetAddProps = {
    closeSend?: any,
    detect?: any
};

const AssetPopUpAssetAdd: Component<AssetPopUpAssetAddProps> = (props) => {
    onMount(() => {});

    const [isOpen, setIsOpen] = createSignal(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => {
        setIsOpen(false);
    };

    const [nama, setNama] : any = createSignal(null);
    const [gambar, setGambar]: any = createSignal(null);
    const [base64, setBase64]: any = createSignal(null);
    const [dimensi, setDimensi]: any = createSignal(null);
    const [kecepatan, setKecepatan] : any= createSignal(null);
    const [jarak, setJarak]: any = createSignal(null);
    const [unit, setUnit] : any= createSignal(null); 

    const handleChangeNama = (event: Event) => {
        const input = event.target as HTMLInputElement; 
        setNama(input.value);
    };
    const handleChangeGambar  = async (event: Event) => {
        const input = event.target as HTMLInputElement; 
        setGambar(input.value);
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const base64String = await convertToBase64(file);
            setBase64(base64String);
        }
    };
    const handleChangeDimensi  = (event: Event) => {
        const input = event.target as HTMLInputElement; 
        setDimensi(input.value);
    };
    const handleChangeKecepatan  = (event: Event) => {
        const input = event.target as HTMLInputElement; 
        setKecepatan(input.value);
    };
    const handleChangeJarak  = (event: Event) => {
        const input = event.target as HTMLInputElement; 
        setJarak(input.value);
    };
    const handleChangeUnit  = (event: Event) => {
        const input = event.target as HTMLInputElement; 
        setUnit(input.value);
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const [alertStatusOk, setAlertStatusOk] = createSignal(false); 
    const [alertStatusError, setAlertStatusError] = createSignal(false);  

    const handleClick = () => {
        let data = {
            "nama": nama(),
            "gambar": base64(),
            "dimensi": dimensi(),
            "kecepatan":  kecepatan(),
            "jarak": jarak(),
            "unit": unit(),
            "koor_lat": "117° 53' 28.4' E",
            "koor_lng": "3° 18' 20.8' S",
            "lat": "(117.89121°",
            "lng": "-3.30578°",
        } 
        console.log("event DATA ALL -> ", data);   

        if(nama() !== null || base64() !== null || dimensi() !== null || kecepatan() !== null || jarak() !== null || unit() !== null ) { 
            fetchDataAssetKapalAdd(data).then((data: any) => {
                console.log("data add -> ", data);
                if(data.status === 'ok'){
                    setAlertStatusOk(true);
                    setTimeout(() => {
                        setAlertStatusOk(false);
                    }, 1000);
                    setTimeout(() => {
                        setNama(null); 
                        setBase64(null);
                        setDimensi(null);
                        setKecepatan(null);
                        setJarak(null);
                        setUnit(null);
                        props.detect(true);   
                        onClose();  
                        props.closeSend;
                    }, 1300);
                }
            }); 
        } else {
            setAlertStatusError(true);
            setTimeout(() => {
                setAlertStatusError(false);
            }, 1000);
        }
    };

    return (
        <div class="popup-container">
            <div class="popup-header">
                <div class="header-content">
                    <div class="header-title">
                        <Flex>
                            <span>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 26.8675C4.11875 26.9875 5.48 25.625 6.66625 25.625C7.8525 25.625 9.78125 26.8812 10.8337 26.8675C12.0962 26.8787 13.575 25.625 15 25.625C16.425 25.625 17.9038 26.8787 19.1663 26.8675C20.785 26.9875 22.1462 25.625 23.3337 25.625C24.5212 25.625 26.4475 26.8812 27.5 26.8675M7.5 25.625C5.7275 23.4175 4.47875 20.5912 3.94625 19.0937C3.7775 18.6187 3.69375 18.3812 3.79125 18.1537C3.89 17.9275 4.12875 17.8212 4.61 17.6087L13.9725 13.4613C14.4775 13.2363 14.7312 13.125 15 13.125C15.2688 13.125 15.5225 13.2375 16.0287 13.4625L25.39 17.6087C25.87 17.8212 26.11 17.9275 26.2087 18.1537C26.3062 18.3812 26.2213 18.6187 26.0538 19.0937C25.5213 20.5912 24.2725 23.4175 22.5 25.625" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.5 16.25L7.77 12.7412C7.93875 10.5512 8.0225 9.45625 8.74125 8.79125C9.46 8.125 10.5588 8.125 12.755 8.125H17.245C19.4412 8.125 20.54 8.125 21.2575 8.79125C21.9775 9.45625 22.0613 10.5512 22.23 12.7412L22.5 16.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.625 8.125L10.84 6.41C11.035 4.84625 11.1325 4.06375 11.665 3.59375C12.1962 3.125 12.9837 3.125 14.56 3.125H15.44C17.015 3.125 17.8038 3.125 18.335 3.59375C18.8675 4.06375 18.965 4.84625 19.16 6.41L19.375 8.125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span class="title-text">Tambah Data Kapal</span>
                        </Flex>
                    </div>

                    <div class="close-icon">
                        <AiTwotoneCloseCircle onClick={() => props.closeSend} class="cp" />
                    </div>
                </div>
            </div>
            <div class="popup-content">
                <div class="input-group">
                    <InputGroup>
                        <InputLeftAddon class="inp">Nama Asset :</InputLeftAddon>
                        <Input onChange={handleChangeNama} class="inp" type="text" />
                    </InputGroup>
                </div>
                <div class="input-group">
                    <input type="file" id="file-upload" class="inputfile" onChange={handleChangeGambar} />
                    <label htmlFor="file-upload" class="file-upload">
                        <span class="upload-text">Upload Gambar</span>
                    </label>
                </div>
                <div class="input-group">
                    <InputGroup>
                        <InputLeftAddon class="inp">Dimensi :</InputLeftAddon>
                        <Input onChange={handleChangeDimensi} class="inp" type="text" />
                    </InputGroup>
                </div>
                <div class="input-group">
                    <InputGroup>
                        <InputLeftAddon class="inp">Kecepatan :</InputLeftAddon>
                        <Input onChange={handleChangeKecepatan} class="inp" type="text" />
                    </InputGroup>
                </div>
                <div class="input-group">
                    <InputGroup>
                        <InputLeftAddon class="inp">Jarak :</InputLeftAddon>
                        <Input onChange={handleChangeJarak} class="inp" type="text" />
                    </InputGroup>
                </div>
                <div class="input-group">
                    <InputGroup>
                        <InputLeftAddon class="inp">Unit :</InputLeftAddon>
                        <Input onChange={handleChangeUnit} class="inp" type="text" />
                    </InputGroup>
                </div>
                <Show when={alertStatusOk()}>
                    <Alert status="success">
                        <AlertIcon />
                        Berhasil Menambah Data
                    </Alert>
                </Show>
                <Show when={alertStatusError()}>
                    <Alert status="error">
                        <AlertIcon />
                        Gagal Menambah Data
                    </Alert>
                </Show>
                <div class="save-button">
                    <Button onClick={handleClick} class="save-btn">Simpan</Button>
                </div>
            </div>
        </div>
    );
};

export default AssetPopUpAssetAdd;
