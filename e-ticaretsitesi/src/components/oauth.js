import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const GoogleOAuth = ({handleOAuth , label})=>{
    const googleOAuth = useGoogleLogin( {
        onSuccess:async (response) => {
            try{
                const res = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers:{
                        Authorization: 'Bearer ' + response.access_token,
                    },
                }
                );
                handleOAuth(res.data);
            } 
            catch(err){
                handleOAuth(err);
            }
        }
    });
    return(
        <button className='btn btn-outline-danger shadow mt-1 w-100' onClick={googleOAuth}>{label}</button>
    );
}

