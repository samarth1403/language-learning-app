import {CircularProgress} from "@mui/material";

const Loader = ({marginTop}:{marginTop:string}) => {
  return (
    <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" , marginTop:marginTop}}>
      <CircularProgress />
    </div>
  );
}

export default Loader