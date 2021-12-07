import LinkIcon from "@mui/icons-material/Link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const getLinkedinColumns = (onDelete) => [
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
];
