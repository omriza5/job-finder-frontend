import LinkIcon from "@mui/icons-material/Link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import { jobStatusOptions } from "../services/selectOptions";

export const getLinkedinColumns = (onDelete, onSave) => [
  { Header: "Title", accessor: "title" },
  { Header: "Company", accessor: "company" },
  { Header: "Location", accessor: "location" },
  { Header: "Mode", accessor: "mode" },
  {
    Header: "Apply",
    accessor: "link",
    Cell: (e) => (
      <a href={e.value} target="_blank" rel="noreferrer">
        <LinkIcon style={{ fontSize: "3rem" }} />
      </a>
    ),
  },
  {
    Header: "Delete",
    Cell: ({ row }) => (
      <DeleteForeverIcon
        style={{ fontSize: "3rem", cursor: "pointer" }}
        onClick={() => onDelete(row.original._id)}
      />
    ),
  },
  {
    Header: "Save",
    Cell: ({ row }) => (
      <AddIcon
        style={{ fontSize: "3rem", cursor: "pointer" }}
        onClick={() => onSave(row.original._id)}
      />
    ),
  },
];

export const getAppliedColumns = (onAppliedStatus) => [
  { Header: "Title", accessor: "title" },
  { Header: "Company", accessor: "company" },
  { Header: "Location", accessor: "location" },
  { Header: "Mode", accessor: "mode" },
  { Header: "Apply Date", accessor: "applyDate" },
  {
    Header: "Info",
    accessor: "link",
    Cell: (e) => (
      <a href={e.value} target="_blank" rel="noreferrer">
        <LinkIcon style={{ fontSize: "3rem" }} />
      </a>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => (
      <Select
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: "1", fontSize: "1.5rem" }),
        }}
        options={jobStatusOptions}
        onChange={(option) => onAppliedStatus(row, option.label)}
        defaultValue={{ label: row.original.status }}
      />
    ),
  },
];

export const getFilteredColumns = () => [
  { Header: "Title", accessor: "title" },
  { Header: "Company", accessor: "company" },
  { Header: "Location", accessor: "location" },
  { Header: "Mode", accessor: "mode" },
  { Header: "Apply Date", accessor: "applyDate" },
  {
    Header: "Status",
    accessor: "status",
  },
];
