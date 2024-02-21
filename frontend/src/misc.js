import { updateDisplayForUser } from "./DOM_manipulation";
import { setInitialUserBox } from "./DOM_manipulation";

function checkUserAuthentication() {
        fetch('/check_authentication')
          .then(response => response.json())
          .then(data => {
            if (data.authenticated) {
                const username = data.username;
                updateDisplayForUser(username)
            } else {
              setInitialUserBox()
            }
          })
          .catch(error => {
            console.error('Error checking authentication:', error);
          });
      }
      


export default checkUserAuthentication;
export function logoutUser(){
    fetch('/logout')
        .then(() => {
            checkUserAuthentication();
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
}