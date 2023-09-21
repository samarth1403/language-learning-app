import {CircularProgress} from "@mui/material";

const Loader = () => {
  return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" , marginTop:"4rem"}}>
      <CircularProgress />
    </div>
  );
}

export default Loader