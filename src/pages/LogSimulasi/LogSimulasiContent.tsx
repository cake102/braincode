import { Component, onMount, Show } from "solid-js";
import { createSignal } from "solid-js";
import './LogSimulasiContent.css'
import { Flex, Spacer } from "@hope-ui/solid"
import MapView from "../MapView";
import { Button } from "@hope-ui/solid"
import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import AgGridSolid, { AgGridSolidRef } from "ag-grid-solid";
import { ColDef } from "ag-grid-community";
import "ag-grid-enterprise";
import { BiRegularSearchAlt } from "solid-icons/bi";
import { AiOutlinePlus } from 'solid-icons/ai'
import { BsFilterSquare } from "solid-icons/bs";
import LogSimulasiMapEditorSimulator from "./LogSimulasiMapEditorSimulator";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@hope-ui/solid"
import LogSimulasiPopUpAssetAdd from "./LogSimulasiPopUpAssetAdd";
import LogSimulasiPopUpDataGisAdd from "./LogSimulasiPopUpDataGisAdd";
import { fetchDataRuteKapal } from "../../service/service";


type LogSimulasiContentProps = {
};

const LogSimulasiContent: Component<LogSimulasiContentProps> = (props) => {
  let gridRefAsset: AgGridSolidRef;
  let gridRefGis: AgGridSolidRef;
  let gridRefEditorSimulator: AgGridSolidRef;
  const [rowDataAsset, setRowDataAsset] = createSignal([]);
  const [rowDataGis, setRowDataGis] = createSignal([]);
  const [rowDataEditorSimulator, setRowDataEditorSimulator] = createSignal([]);
  const defaultColdefAsset = {
    filter: true,
    resizable: true,
    sortable: true,
  };
  const gridOptionsAsset = {
    rowHeight: 70,
    headerHeight: 50,
    rowStyle: { textAlign: "center" },
  };

  const defaultColdefGis = {
    filter: true,
    resizable: true,
    sortable: true,
  };
  const gridOptionsGis = {
    rowHeight: 40,
    headerHeight: 50,
    rowStyle: { textAlign: "center" },
  };

  const defaultColdefEditorSimulator = {
    filter: true,
    resizable: true,
    sortable: true,
  };
  const gridOptionsEditorSimulator = {
    rowHeight: 40,
    headerHeight: 50,
    rowStyle: { textAlign: "center" },
  };

  const ImageRenderer = ({ data }: { data: any }) => {
    onMount(() => {
    })
    return (
     <>
     <img class="imgs-lssb" style="    width: 70px;  height: 60px; " src={`${data.image}`} />
     </>
    );
  };

  const ButtonRenderer = ({ data }: { data: any }) => {
    return (
     <>
     <span style="cursor:pointer">
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.667 1.66663H3.33366C2.40866 1.66663 1.66699 2.40829 1.66699 3.33329V16.6666C1.66699 17.5916 2.40866 18.3333 3.33366 18.3333H16.667C17.592 18.3333 18.3337 17.5916 18.3337 16.6666V3.33329C18.3337 2.40829 17.592 1.66663 16.667 1.66663ZM16.667 16.6666H3.33366V3.33329H16.667M7.35866 8.54163L6.07533 7.25829L5.00033 8.33329V4.99996H8.33366L7.25866 6.07496L8.54199 7.35829M11.4587 7.35829L12.742 6.07496L11.667 4.99996H15.0003V8.33329L13.9253 7.25829L12.642 8.54163M12.642 11.4583L13.9253 12.7416L15.0003 11.6666V15H11.667L12.742 13.925L11.4587 12.6416M8.54199 12.6416L7.25866 13.925L8.33366 15H5.00033V11.6666L6.07533 12.7416L7.35866 11.4583" fill="#9BEC00"/>
</svg>
</span>
     </>
    );
  };
  const [columnDefsDataAsset, setColumnDefsDataAsset]: any = createSignal([
    {
      headerName: "Nama Asset",
      field: "nama",
      width: 95,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      field: "image",
      headerName: "Gambar Asset",
      width: 110,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellRenderer: ImageRenderer,
    },
    {
      headerName: "Dimensi",
      field: "dimensi",
      width: 80,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Kecepatan",
      field: "kecepatan",
      width: 90,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Jarak",
      field: "jarak",
      width: 80,
      headerClass: 'ag-header-cell',
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Unit",
      field: "unit",
      width: 90,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
  ]);

  const [columnDefsDataGis, setColumnDefsDataGis]: any = createSignal([
    {
      headerName: "Lokasi",
      field: "lokasi",
      width: 110,
      cellStyle: {
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      field: "luas",
      headerName: "Luas",
      width: 100,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }
    },
    {
      headerName: "Latitude",
      field: "latitude",
      width: 195,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Longitude",
      field: "longitude",
      width: 195,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    }
  ]);

  const [columnDefsDataEditorSimulator, setColumnDefsDataEditorSimulator]: any = createSignal([
    {
      field: "detail",
      headerName: "",
      width: 50,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellRenderer: ButtonRenderer,
    },
    {
      headerName: "Pos Mulai",
      field: "start_pos",
      width: 90,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    }, {
      headerName: "Pos Stop",
      field: "end_pos",
      width: 90,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },{
      headerName: "Mulai",
      field: "start_date",
      width: 80,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Stop",
      field: "end_date",
      width: 80,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Kapal",
      field: "start_kapal.nama",
      width: 100,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
    },
    {
      headerName: "Jarak Titik",
      field: "jarak_marker",
      width: 100,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
      valueFormatter: (params: any) => {
        return `${(params.value / 1000).toFixed(2)} km`;
    },
    },
     {
      headerName: "Jarak Garis",
      field: "jarak_polyline",
      width: 100,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }, cellClass: "center-cell",
      valueFormatter: (params: any) => {
        return `${(params.value / 1000).toFixed(2)} km`;
    },
    }

  ]);

  const [dataAsset, setDataAsset] = createSignal([]);
  const [dataGis, setDataGis] = createSignal([]);
  const [dataEditorSimulator, setDataEditorSimulator] = createSignal([]);
  const [editorSimulatorSend, setEditorSimulatorSend] : any = createSignal([]);

  const [dataAssetSelect, setDataAssetSelect] = createSignal([]);

  const addData = () => {
  const dataAssetLocal : any = JSON.parse(localStorage.getItem('dataAsset'));
   let data = {
      "nama": "Ly Thai Toaasadad",
      "image": "lythaito.jpg",
      "dimensi": "102 x 15 x 5.3",
      "kecepatan": "26",
      "jarak": "5.000",
      "unit": "SSM, SAM, AK-176, AK-630, AO-18KD, ESM/ECM, Radar Air, Surface, Sonar"
  }
  console.log("before add -> ", dataAssetLocal);
    dataAssetLocal.push(data)
    console.log("after add",dataAssetLocal)
  localStorage.setItem('dataAsset', JSON.stringify(dataAssetLocal));
  }
  const fetchDataAsset = async () => {
      try {
        const response = await fetch('/public/json/data-asset-kapal.json');
        if (!response.ok) {
          throw new Error("Gagal");
        }
        const data = await response.json();
        if (data) {
          const dataAssetLocal : any = JSON.parse(localStorage.getItem('dataAsset'));
          console.log("dataAssetLocal -> ", dataAssetLocal)
          if(dataAssetLocal == null){
            setDataAsset(data);
            setRowDataAsset(dataAsset())
            localStorage.setItem('dataAsset', JSON.stringify(dataAsset()));
          }else{
            setTimeout(() =>{
              setDataAsset(dataAssetLocal);
              setRowDataAsset(dataAssetLocal)
            },200)
          }

        } else {
        }
      } catch (error) {
      }
    };

    const fetchDataGis = async () => {
      try {
        const response = await fetch('/public/json/data-gis.json');
        if (!response.ok) {
          throw new Error("Gagal");
        }
        const data = await response.json();
        if (data) {
          const dataGisLocal : any = JSON.parse(localStorage.getItem('dataGis'));
          console.log("dataGisLocal -> ", dataGisLocal)
          if(dataGisLocal == null){
            setDataGis(data);
            setRowDataGis(dataGis())
            localStorage.setItem('dataGis', JSON.stringify(dataGis()));
          }else{
            setTimeout(() =>{
              setDataGis(dataGisLocal);
              setRowDataGis(dataGisLocal)
            },200)
          }

        } else {
        }
      } catch (error) {
      }
    };

    const fetchDataEditorSimulator = async () => {
      try {
        const response = await fetch('/public/json/data-editor-simulator.json');
        if (!response.ok) {
          throw new Error("Gagal");
        }
        const data = await response.json();
        if (data) {
          const dataEditorSimulatorLocal : any = JSON.parse(localStorage.getItem('dataEditorSimulator'));
          console.log("dataEditorSimulatorLocal -> ", dataEditorSimulatorLocal)
          if(dataEditorSimulatorLocal == null){
            setDataEditorSimulator(data);
            setRowDataEditorSimulator(dataEditorSimulator())
            localStorage.setItem('dataEditorSimulator', JSON.stringify(dataEditorSimulator()));
          }else{
            setTimeout(() =>{
              setDataEditorSimulator(dataEditorSimulatorLocal);
              setRowDataEditorSimulator(dataEditorSimulatorLocal)
            },200)
          }
        } else {
        }
      } catch (error) {
      }
    };



  onMount(() => {
    fetchDataAsset()
    fetchDataGis()
    fetchDataRuteKapal().then((data: any) => {
      console.log("data add -> ", data);
      setDataEditorSimulator(data.filter);
      setRowDataEditorSimulator(data.data);
    })
  })

  const dataSelectAsset = createOptions(
    dataAsset,
    { key: "nama" }
)

const dataSelectGis = createOptions(
  dataGis,
  { key: "lokasi" }
)

const dataSelectEditorSimulator = createOptions(
  dataEditorSimulator,
  { key: "position" }
)



const onFilterAsset = (event: any) => {
  if(event == null){
    gridRefAsset.api.setQuickFilter('')
  }else{
    gridRefAsset.api.setQuickFilter(event.nama)
  }

}

const onFilterGis = (event: any) => {
  if(event == null){
    gridRefGis.api.setQuickFilter('')
  }else{
    gridRefGis.api.setQuickFilter(event.lokasi)
  }

}

const onFilterEditor = (event: any) => {
  if(event == null){
    gridRefEditorSimulator.api.setQuickFilter('')
  }else{

  gridRefEditorSimulator.api.setQuickFilter(event.aset)
  }
}

const [scrollBehavior, setScrollBehavior] = createSignal("inside");
const [isOpenAsset, setIsOpenAsset] = createSignal(false);
const [isOpenDataGis, setIsOpenDataGis] = createSignal(false);


const onOpenAsset = () => setIsOpenAsset(true);
const onCloseAsset = () => {
  const dataAssetLocal : any = JSON.parse(localStorage.getItem('dataAsset'));
  setDataAsset(dataAssetLocal);
  setRowDataAsset(dataAsset())
  setIsOpenAsset(false)

};

const onOpenDataGis = () => setIsOpenDataGis(true);
const onCloseDataGis = () => {
  const dataGisLocal : any = JSON.parse(localStorage.getItem('dataGis'));
  setDataGis(dataGisLocal);
  setRowDataGis(dataGis())
  setIsOpenDataGis(false)
};

const onCloseDataEditorSimulator = () => {

  fetchDataRuteKapal().then((data: any) => {
    console.log("data add -> ", data);
    setDataEditorSimulator(data.filter);
    setRowDataEditorSimulator(data.data);

  })
};


const selectionChangedCallback = (params: any) => {
  console.log('selection has changed', params.api.getSelectedRows());
  setEditorSimulatorSend(params.api.getSelectedRows())
};

  return (
    <>
<div style="width:100%;margin: 5px;">
  <div style="border: 1px solid #c295d0c2;
      background: #251c3d;
    border-radius: 20px;">
    <div style="    border-bottom: 1px solid #c295d0c2;
    padding: 2.4vh;">
      <Flex>
        <div style="width:50%">
          <Flex>
<span>
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_705_253)">
<path d="M15.0001 3.54163C12.3774 3.53863 9.80854 4.28625 7.59703 5.69619C5.38551 7.10614 3.62367 9.11952 2.5196 11.4985C1.41552 13.8776 1.01532 16.5229 1.36626 19.122C1.7172 21.7212 2.80462 24.1656 4.50009 26.1666L4.75009 26.4583H25.2501L25.5001 26.1666C27.1956 24.1656 28.283 21.7212 28.6339 19.122C28.9849 16.5229 28.5847 13.8776 27.4806 11.4985C26.3765 9.11952 24.6147 7.10614 22.4032 5.69619C20.1916 4.28625 17.6228 3.53863 15.0001 3.54163ZM22.1668 11.4416L17.2334 16.2833C17.4856 16.8164 17.5412 17.4214 17.3904 17.9915C17.2396 18.5616 16.8922 19.06 16.4094 19.3988C15.9267 19.7375 15.3398 19.8946 14.7524 19.8425C14.165 19.7903 13.615 19.5322 13.1995 19.1138C12.784 18.6953 12.5298 18.1435 12.4818 17.5557C12.4338 16.968 12.5951 16.3822 12.9372 15.9019C13.2793 15.4216 13.7802 15.0777 14.3514 14.9309C14.9225 14.7842 15.5272 14.8441 16.0584 15.1L20.9834 10.2583L22.1668 11.4416ZM3.00009 16.5833H5.83343V18.25H2.96676C2.96676 17.925 2.92509 17.6083 2.92509 17.275C2.92509 16.9416 2.94176 16.8166 2.95843 16.5833H3.00009ZM7.06676 8.24997L9.11676 10.3L7.89176 11.45L5.83343 9.4083C6.20367 8.98759 6.60179 8.59225 7.02509 8.22497L7.06676 8.24997ZM15.8334 8.1583H14.1668V5.24163H15.0001C15.3084 5.24163 15.5834 5.24163 15.8334 5.2833V8.1583ZM27.0751 17.2833C27.0751 17.6083 27.0751 17.9416 27.0334 18.2583H24.1001V16.5916H27.0418C27.0584 16.8166 27.0751 17.05 27.0751 17.2833Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_705_253">
<rect width="30" height="30" fill="white"/>
</clipPath>
</defs>
</svg>


</span>
<span style="font-family: 'jaldiBold';
    color: white;
    margin-left: 10px;
    margin-top: 5px;">Editor Simulator</span>
</Flex>
        </div>
        <div style="width:50%;    width: 50%;
    justify-content: end;
    display: flex;">
          <Flex>
        <BiRegularSearchAlt class="icsearchls" />
        <Select placeholder='Search' class="custom-ls" {...dataSelectEditorSimulator} onChange={(e : any) => onFilterEditor(e)}/>
        <BsFilterSquare class="icfills" />
                            </Flex>
          </div>
      </Flex>
    </div>
    <Flex>
    <div style="width:65%">
      <LogSimulasiMapEditorSimulator closeSend={onCloseDataEditorSimulator()} sendData={editorSimulatorSend()} />
    </div>
    <div style="width:35%">
<div class="ag-theme-balham" style="width:100%;height:400px;border: none;    padding: 2vh;">
        <AgGridSolid
          columnDefs={columnDefsDataEditorSimulator()}
          rowData={rowDataEditorSimulator()}
          rowSelection="single"
          defaultColDef={defaultColdefEditorSimulator}
          gridOptions={gridOptionsEditorSimulator}
          onSelectionChanged={selectionChangedCallback}

          ref={gridRefEditorSimulator!}
        />
        </div>
        </div>
        </Flex>
      </div>
</div>

{/* ----------------------- */}

      <Modal  centered size={'xl'}
        scrollBehavior={scrollBehavior()}
        opened={isOpenAsset()}
        onCloseAsset={onCloseAsset}
      >
        <ModalOverlay  />
        <ModalContent>
          <ModalBody>
         <LogSimulasiPopUpAssetAdd  closeSend={onCloseAsset()}/>
          </ModalBody>
        </ModalContent>
      </Modal>



{/* ----------------------- */}

<Modal  centered size={'4xl'}
        scrollBehavior={scrollBehavior()}
        opened={isOpenDataGis()}
        onCloseAsset={onCloseDataGis}
      >
        <ModalOverlay  />
        <ModalContent>
          <ModalBody>
         <LogSimulasiPopUpDataGisAdd  closeSend={onCloseDataGis()}/>
          </ModalBody>
        </ModalContent>
      </Modal>


    </>
  );
};
export default LogSimulasiContent;