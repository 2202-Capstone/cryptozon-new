import {Wrap, Button, useToast, WrapItem} from '@chakra-ui/react'
import { useAddress } from '@thirdweb-dev/react'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications, markDelivered, cleanNotifications } from '../../store/notifications'
export const Notifications = () => {
    const address = useAddress()
    const {user:walletUser} = useSelector(state => state.user);
    const Notifications = useSelector(state => state.globalNotifications);
    const toast = useToast()
    const dispatch = useDispatch();
    const positions = [
      'top',
      'top-right',
      'top-left',
      'bottom',
      'bottom-right',
      'bottom-left',
    ]
    useEffect(()=>{
        //check for notifications and show them as they're updated
        const interval = setInterval(() => {
            if(!!walletUser.username){
                dispatch(fetchNotifications(walletUser.id));
            }
        }, 10000);
        if(!!walletUser.username && Notifications.status!=='success' && Notifications.status!=='loading'){
            dispatch(fetchNotifications(walletUser.id));
        }
        if(!!Notifications.notifications){
            if(Notifications.notifications.length>0){
                Notifications.notifications.map(notif=>{
                    const {content, id, title} = notif
                    showNotification(id, title, content)
                })
            }
        }
        return () =>{
            if(!!walletUser.username){
                clearInterval(interval);
            }
        }
        
    },[dispatch, Notifications, walletUser])
    const showNotification = (id, title,content) =>{
        if(!toast.isActive(id)){
            toast({
                id,
                title: title,
                description: content,
                position: 'bottom-right',
                isClosable: true,
                onCloseComplete: ()=>makeDelivered(id),
            })
        }     
    }
    const makeDelivered = (id) => {
        dispatch(markDelivered(id))
        dispatch(cleanNotifications())
        toast.close(id)
    }
    return (
      <>
      </>
    )
  }
export default Notifications