import { Component, onMount, Show } from "solid-js";
import { createSignal } from "solid-js";
import './AssetContent.css'; // Impor file CSS di sini
import { Flex, Spacer, Button, IconButton } from "@hope-ui/solid";
import MapView from "../MapView";
import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import AgGridSolid, { AgGridSolidRef } from "ag-grid-solid";
import { ColDef } from "ag-grid-community";
import "ag-grid-enterprise";
import { BiRegularSearchAlt } from "solid-icons/bi";
import { AiFillCloseSquare, AiOutlinePlus } from "solid-icons/ai";
import AssetMapEditorSimulator from "./AssetMapEditorSimulator";
import { BsChevronDown, BsChevronUp } from "solid-icons/bs";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@hope-ui/solid";
import AssetPopUpAssetAdd from "./AssetPopUpAssetAdd";
import AssetPosPopUpAdd from "./AssetPosPopUpAdd";
import { fetchDataAssetKapal, fetchDataAssetPos, fetchDataAssetPosDelete } from "../../service/service";
import { RiSystemDeleteBin2Line } from "solid-icons/ri";
import { FiEdit } from "solid-icons/fi";
import AssetPosPopUpEdit from "./AssetPosPopUpEdit";

// Define props interface
type AssetContentProps = {};

// Define component
const AssetContent: Component<AssetContentProps> = (props) => {
  let gridRefAssetPos: AgGridSolidRef;
  let gridRefAssetKapal: AgGridSolidRef;
  const [rowDataAssetPos, setRowDataAssetPos] = createSignal([]);
  const [rowDataAssetKapal, setRowDataAssetKapal] = createSignal([]);
  
  const defaultColdefAssetPos = {
    filter: true,
    resizable: true,
    sortable: true,
  };

  const gridOptionsAssetPos = {
    rowHeight: 40,
    headerHeight: 50,
    rowStyle: { textAlign: "center" },
  };

  const defaultColdefAssetKapal = {
    filter: true,
    resizable: true,
    sortable: true,
  };

  const gridOptionsAssetKapal = {
    rowHeight: 70,
    headerHeight: 50,
    rowStyle: { textAlign: "center" },
  };

  // Image renderer for grid
  const ImageRenderer = ({ data }: { data: any }) => {
    onMount(() => {});
    return (
      <>
        <img class="imgs-lssb" style="width: 70px; height: 60px;" src={`${data.gambar}`} />
      </>
    );
  };

  // Button renderer for grid
  const ButtonRenderer = ({ data }: { data: any }) => {
    onMount(() => {});
    return (
      <>
        <Flex>
          <span style="margin-right: 10px;">
            <IconButton
              onClick={() => onOpenAssetPosEdit(data)}
              style="background: #8321b5;"
              size="xs"
              aria-label="Edit"
              icon={<FiEdit />}
            />
          </span>
          <span>
            <IconButton
              onClick={onOpenAssetPosDelete}
              style="background: #ef0000;"
              size="xs"
              aria-label="Delete"
              icon={<RiSystemDeleteBin2Line />}
            />
          </span>
        </Flex>
      </>
    );
  };

  // Column definitions for kapal data
  const [columnDefsDataAssetKapal, setColumnDefsDataAssetKapal]: any = createSignal([
    {
      headerName: "Nama Asset",
      field: "nama",
      width: 300,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
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
      width: 180,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
    },
    {
      headerName: "Kecepatan",
      field: "kecepatan",
      width: 180,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
    },
    {
      headerName: "Jarak",
      field: "jarak",
      width: 180,
      headerClass: "ag-header-cell",
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
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
      },
      cellClass: "center-cell",
    },
  ]);

  // Column definitions for POS data
  const [columnDefsDataAssetPos, setColumnDefsDataAssetPos]: any = createSignal([
    {
      headerName: "Asset Grup",
      field: "grup",
      width: 120,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
    },
    {
      field: "lokasi",
      headerName: "Lokasi",
      width: 110,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      headerName: "Longitude",
      field: "lng",
      width: 120,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
    },
    {
      headerName: "Latitude",
      field: "lat",
      width: 100,
      flex: 1,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellClass: "center-cell",
    },
    {
      field: "",
      headerName: "Aksi",
      width: 130,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      cellRenderer: ButtonRenderer,
    },
  ]);

  const [dataAssetPos, setDataAssetPos]: any = createSignal([]);
  const [dataAssetKapal, setDataAssetKapal]: any = createSignal([]);

  // Fetch data on mount
  onMount(() => {
    fetchDataAssetKapal().then((data: any) => {
      setRowDataAssetKapal(data.data);
      setDataAssetKapal(data.filter);
    });

    fetchDataAssetPos().then((data: any) => {
      setRowDataAssetPos(data.data);
      setDataAssetPos(data.filter);
    });
  });

  // Create options for select components
  const dataSelectAssetPos = createOptions(dataAssetPos, { key: "lokasi" });
  const dataSelectAssetKapal = createOptions(dataAssetKapal, { key: "nama" });

  // Filter handlers
  const onFilterAssetPos = (event: any) => {
    if (event == null) {
      gridRefAssetPos.api.setQuickFilter('');
    } else {
      gridRefAssetPos.api.setQuickFilter(event.lokasi);
    }
  };

  const onFilterAssetKapal = (event: any) => {
    if (event == null) {
      gridRefAssetKapal.api.setQuickFilter('');
    } else {
      gridRefAssetKapal.api.setQuickFilter(event.nama);
    }
  };

  // Modal and state handling
  const [scrollBehavior, setScrollBehavior] = createSignal("inside");
  const [isOpenAssetKapal, setIsOpenAssetKapal] = createSignal(false);
  const [AssetPosSelection, setAssetPosSelection]: any = createSignal(null);
  const [isOpenAssetPos, setIsOpenAssetPos] = createSignal(false);
  const [isOpenAssetPosDelete, setIsOpenAssetPosDelete] = createSignal(false);
  const [isOpenAssetPosEdit, setIsOpenAssetPosEdit] = createSignal(false);

  const [posDetect, setPosDetect] = createSignal(false);

  const handlePosDetect = (res: any) => {
    setPosDetect(!posDetect());
  };

  const onOpenAssetKapal = () => setIsOpenAssetKapal(true);
  const onCloseAssetKapal = () => setIsOpenAssetKapal(false);
  const onOpenAssetPos = () => setIsOpenAssetPos(true);
  const onCloseAssetPos = () => setIsOpenAssetPos(false);
  const onOpenAssetPosDelete = () => setIsOpenAssetPosDelete(true);
  const onCloseAssetPosDelete = () => setIsOpenAssetPosDelete(false);
  const onOpenAssetPosEdit = (data: any) => {
    setAssetPosSelection(data);
    setIsOpenAssetPosEdit(true);
  };
  const onCloseAssetPosEdit = () => setIsOpenAssetPosEdit(false);

  // Asset POS delete handler
  const handleAssetPosDelete = () => {
    fetchDataAssetPosDelete(AssetPosSelection().id).then(() => {
      fetchDataAssetPos().then((data: any) => {
        setRowDataAssetPos(data.data);
        setDataAssetPos(data.filter);
        onCloseAssetPosDelete();
      });
    });
  };

  return (
    <>
      <div class="flex-container">
        <div class="grid-item map-view">
          <MapView posDetect={posDetect} />
        </div>

        <div class="grid-item map-editor">
          <AssetMapEditorSimulator posDetect={handlePosDetect} />
        </div>

        <div class="grid-item asset-kapal">
          <div class="card-header">
            <div style="width: 100%; padding: 10px; border: 1px solid; border-color: #ededed; border-radius: 10px; background-color: #e0e0e0;">
              <Flex alignItems="center" justifyContent="space-between">
                <span style="font-size: 14px; font-weight: 500;">Asset Kapal</span>
                <Spacer />
                <span style="display: flex; justify-content: right;">
                  <span style="margin-right: 5px;">
                    <Select {...dataSelectAssetKapal} placeholder="Filter Kapal" onChange={onFilterAssetKapal} />
                  </span>
                  <Button leftIcon={<BiRegularSearchAlt />} colorScheme="info" size="sm" variant="solid">
                    Search
                  </Button>
                  <span style="margin-left: 5px;">
                    <Button leftIcon={<AiOutlinePlus />} colorScheme="accent" size="sm" variant="solid" onClick={onOpenAssetKapal}>
                      Add
                    </Button>
                  </span>
                </span>
              </Flex>
            </div>
          </div>

          <div class="ag-theme-alpine" style="width: 100%; height: 280px; border-radius: 10px; border: 1px solid #e0e0e0;">
            <AgGridSolid
              ref={gridRefAssetKapal}
              gridOptions={gridOptionsAssetKapal}
              defaultColDef={defaultColdefAssetKapal}
              rowData={rowDataAssetKapal()}
              columnDefs={columnDefsDataAssetKapal()}
            ></AgGridSolid>
          </div>
        </div>

        <div class="grid-item asset-pos">
          <div class="card-header">
            <div style="width: 100%; padding: 10px; border: 1px solid; border-color: #ededed; border-radius: 10px; background-color: #e0e0e0;">
              <Flex alignItems="center" justifyContent="space-between">
                <span style="font-size: 14px; font-weight: 500;">Asset Pos</span>
                <Spacer />
                <span style="display: flex; justify-content: right;">
                  <span style="margin-right: 5px;">
                    <Select {...dataSelectAssetPos} placeholder="Filter Pos" onChange={onFilterAssetPos} />
                  </span>
                  <Button leftIcon={<BiRegularSearchAlt />} colorScheme="info" size="sm" variant="solid">
                    Search
                  </Button>
                  <span style="margin-left: 5px;">
                    <Button leftIcon={<AiOutlinePlus />} colorScheme="accent" size="sm" variant="solid" onClick={onOpenAssetPos}>
                      Add
                    </Button>
                  </span>
                </span>
              </Flex>
            </div>
          </div>

          <div class="ag-theme-alpine" style="width: 100%; height: 280px; border-radius: 10px; border: 1px solid #e0e0e0;">
            <AgGridSolid
              ref={gridRefAssetPos}
              gridOptions={gridOptionsAssetPos}
              defaultColDef={defaultColdefAssetPos}
              rowData={rowDataAssetPos()}
              columnDefs={columnDefsDataAssetPos()}
            ></AgGridSolid>
          </div>
        </div>
      </div>

      <Show when={isOpenAssetKapal()}>
        <Modal isOpen={isOpenAssetKapal()} onClose={onCloseAssetKapal} scrollBehavior={scrollBehavior()}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Add Asset</ModalHeader>
            <ModalBody>
              <AssetPopUpAssetAdd />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>

      <Show when={isOpenAssetPos()}>
        <Modal isOpen={isOpenAssetPos()} onClose={onCloseAssetPos} scrollBehavior={scrollBehavior()}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Add Asset POS</ModalHeader>
            <ModalBody>
              <AssetPosPopUpAdd />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>

      <Show when={isOpenAssetPosEdit()}>
        <Modal isOpen={isOpenAssetPosEdit()} onClose={onCloseAssetPosEdit} scrollBehavior={scrollBehavior()}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Edit Asset POS</ModalHeader>
            <ModalBody>
              <AssetPosPopUpEdit assetPosSelection={AssetPosSelection()} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Show>

      <Show when={isOpenAssetPosDelete()}>
        <Modal isOpen={isOpenAssetPosDelete()} onClose={onCloseAssetPosDelete} scrollBehavior={scrollBehavior()}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Delete Asset POS</ModalHeader>
            <ModalBody>
              <span>Yakin hapus data Asset POS {AssetPosSelection().lokasi}?</span>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleAssetPosDelete} style="margin-right: 10px;" colorScheme="danger" size="sm">
                Delete
              </Button>
              <Button onClick={onCloseAssetPosDelete} size="sm">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Show>
    </>
  );
};

export default AssetContent;
