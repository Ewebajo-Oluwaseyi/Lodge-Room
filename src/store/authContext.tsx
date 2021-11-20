import axios from 'axios';
import React, {createContext, useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { withRouter, useHistory } from 'react-router-dom';


const initialData = {
    _id: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    type: '',
    favorites: [''],
    booked: ['']
}

export interface RoomList {
    _id: string;
    hostid: string;
    hostname: string;
    price: string;
    desc: string;
    location: string;
    title: string;
    features: string;
    booked: boolean,
    image: string
}

const AuthContext = createContext({
    loading: false,
    route: '',
    data: initialData,
    show: false,
    isSignup: false,
    userData: initialData,
    userType: 'guest',
    toggleModal: () => { },
    signIn: () => { },
    guestSignUp: () => { },
    hostSignUp: () => { },
    fetchRoomList: () => { },
    loginType: 'guest',
    logout: () => { },
    loggedIn: false,
    passwordConfirmation: '',
    formError: '',
    handleFirstNameInput: (_e: ChangeEvent<HTMLInputElement>) => { },
    handleLastNameInput: (_e: ChangeEvent<HTMLInputElement>) => { },
    handleEmailInput: (_e: ChangeEvent<HTMLInputElement>) => { },
    handlePasswordInput: (_e: ChangeEvent<HTMLInputElement>) => { },
    handleConfirmPasswordInput: (_e: ChangeEvent<HTMLInputElement>) => { },
    handlePhoneInput: (_e: ChangeEvent<HTMLInputElement>) => { },
    handleSignupSubmit: (_e: MouseEvent<HTMLButtonElement>) => { },
    handleLoginSubmit: (_e: MouseEvent<HTMLButtonElement>) => { },
    handleOption: (_e: ChangeEvent<HTMLSelectElement>) => { },
    updateGuestHost: () => '' as any,
    roomList: [{
        _id: '',
        hostid: '',
        hostname: '',
        price: '',
        desc: '',
        location: '',
        title: '',
        features: '',
        booked: false,
        image: '' 
    }],
    roomView: {
        _id: '',
        hostid: '',
        hostname: '',
        price: '',
        desc: '',
        location: '',
        title: '',
        features: '',
        booked: false,
        image: '' 
    },
    handleRoomView: (_id: any) => { },
    favorites: [''],
    booked: [''],
    handleFavorites: (_data: any) => { },
    handleBooked: (_data: any) => { },
    submitBooking: (_data: any) => '' as any,
    showResults: false,
    searchResults: [{
        _id: '',
        hostid: '',
        hostname: '',
        price: '',
        desc: '',
        location: '',
        title: '',
        features: '',
        booked: false,
        image: '' 
      }],
      handleSearchResults: (_e: ChangeEvent<HTMLInputElement>) => { },
})

const AuthComponet = (props: any) => {
    const history = useHistory();
    const [userData, setUserData] = useState(initialData)
    const [allUsers, setAllUsers] = useState([initialData])
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [isSignup, setSignup] = useState(false)
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUserData, setLoggedInUserData] = useState(initialData)
    const [formError, setFormError] = useState('')
    const [userType, setUserType] = useState('guest');
    const [loginType, setLoginType] = useState('guest');
    const [roomList, setRoomList] = useState<RoomList[]>([])
    const [roomView, setRoomView] = useState({} as RoomList);
    const [favorites, setFavorites] = useState([] as string[]);
    const [booked, setBooked] = useState([] as string[]);
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState<RoomList[]>([]);

    useEffect(() => {
      fetchAllUserData()
      fetchRoomList()
    }, []);

    useEffect(() => {
       setUserData(initialData);
       setFormError('')
    }, [show])


    useEffect(() => {
        const userLoggedIn = localStorage.getItem("user");
        if (userLoggedIn) {
            const storedUser = JSON.parse(userLoggedIn);
            const updateUser = allUsers.find((user) => user.email === storedUser.email && user.type === storedUser.type)
            if(updateUser) {
                localStorage.setItem('user', JSON.stringify(updateUser));
                setLoggedInUserData(updateUser);
                setLoggedIn(true);
                setFavorites(updateUser.favorites);
                setBooked(updateUser.booked);
            }
        }
      }, [favorites, booked, allUsers]);

    const toggleModal = () => {
        setShow(!show)
    };

    const signIn = () => {
        setSignup(false);
        setShow(true);
    };
    
    const guestSignUp = () => {
        setSignup(true);
        setShow(true); 
        setUserType('guest');  
    };

    const hostSignUp = () => {
        setSignup(true);
        setShow(true);
        setUserType('host');
    };

    const handleSearchResults = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)
        const { value } = e.target;
        if (value === '') setShowResults(false);
        else {
          setShowResults(true);
          const results = roomList.filter((item) => item.location && item.location.toLowerCase().indexOf(value.toLowerCase()) !== -1);
          setSearchResults(results);
          console.log(showResults)
        }
      };

    const fetchRoomList = async() => {
        setLoading(true)
        try {
            const res = await axios.get('https://polar-ridge-98480.herokuapp.com/api/listing');
            const { data } = await res;
            setRoomList(data);
            console.log(data);
            setLoading(false)
        } catch (e) {
            
        }
    }

    const handleRoomView = (_id: String) => {
        const room = roomList.find(room => room._id === _id);
        if(room) {
            setRoomView(room);
            props.history.push(`/room/${room._id}`);
            setShowResults(false);
        }
    };

    const handleFavorites = (_id: string) => {
        const currentFav = favorites;
        if (currentFav.includes(_id)) {
            currentFav.slice(currentFav.indexOf(_id), 1)
        } else {
            currentFav.push(_id)
        }

        setFavorites(currentFav);
        updateUser(loggedInUserData._id, {...loggedInUserData, favorites: currentFav})
    }

    const handleBooked = (_id: string) => {
        const currentBook = booked;
        if (currentBook.includes(_id)) {
            currentBook.slice(currentBook.indexOf(_id), 1)
        } else {
            currentBook.push(_id)
        }

        setBooked(currentBook);
        updateUser(loggedInUserData._id, {...loggedInUserData, booked: currentBook})
    }

    const submitBooking = async (body: any) => {
        const config = {
            headers: {'content-type': 'application/json'}
        }
        setLoading(true)
        const res = await axios.post("https://polar-ridge-98480.herokuapp.com/api/booking", body, config);
        if (res.status === 200) {
            await updateRoom(body.roomId, { booked: true });
          }
          console.log(res.data);
          setLoading(false);
          return res;
    }

    const updateRoom = async (id: any, body: { booked: boolean}) => {
        const config = {
            headers: {'content-type': 'application/json'}
        }
        try {
            const res = await axios.put(`https://polar-ridge-98480.herokuapp.com/api/listing/${id}`, body, config);
            console.log(res)
            return res
        } catch(e) {

        }
    }
 
    const updateGuestHost = async () => {
        const res = await updateUser(loggedInUserData._id, {...loggedInUserData, type: 'host'});
        console.log('status', res)
        const updateRes = {...loggedInUserData, type: 'host'};
        localStorage.setItem('user', JSON.stringify(updateRes));
        return res;
    };

    const status = (validation: string) => {
        switch (validation) {
            case 'email': 
              const testRegex = /^[a-zA-Z0-9._&+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
                if (!testRegex.test(userData.email)) {
                    return 'Invalid email address'
                }
                return '';

            case 'password': 
              const numReg = /[0-9]/g;
                if (!(userData.password.trim().length > 7 && numReg.test(userData.password))) {
                    return 'password must exceed 7 numbers or alphabets'
                }
                if (passwordConfirmation !== userData.password) {
                    return 'password do not match'
                }
                return '';
            default: 
            return true;
        }
    };

    const signUp = async (body: {type: any; email: string; password: string; firstname: string; lastname: string; phone: string; favorites: string[]}) => {
        setLoading(true);
        const config = {
            headers: {'content-type': 'application/json'}
        }
        try {
            const data = await axios.post('https://polar-ridge-98480.herokuapp.com/api/users', body, config);
            if (data.data.token) {
                const resData = await fetchUserData(data.data.token);
                console.log(resData);
                 return resData;
              } else {
                  setFormError(data.data.msg) 
                  setTimeout(() => setFormError(''), 2000);
              }
              
        } catch (e) {
          //e && setFormError(e as string) 
          //setTimeout(() => setFormError(''), 2000);
        } finally {
           setLoading(false)
        }
    }

    const Login = async (body: {email: String; password: String; type: string}) => {
        setLoading(true);
        const config = {
            headers: {'content-type': 'application/json'}
        }
        try {
            const data = await axios.post('https://polar-ridge-98480.herokuapp.com/api/auth', body, config)
            console.log(data);
            if (data.data.token) {
              const resData = await fetchUserData(data.data.token);
              console.log(resData);
               return resData;
            } else {
                setFormError(data.data.msg) 
                setTimeout(() => setFormError(''), 2000);
            }
            
        } catch (e) {
          //console.log(msg)
         // e && setFormError(e as string) 
         // setTimeout(() => setFormError(''), 2000);
        } finally {
           setLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
        history.replace('/home')
    }
    
    const fetchUserData = async (token: any) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-token': ''
            }
        }
        if (token) {
            config.headers['X-Auth-token']  = token
        }
        try {
            const res = await axios.get('https://polar-ridge-98480.herokuapp.com/api/auth', config)
            return res
        } catch (e) {
            
        }
    }

    const fetchAllUserData = async () => {
        setLoading(true);
        try{
            const res = await axios.get('https://polar-ridge-98480.herokuapp.com/api/alluser');
            setAllUsers(res.data);
            console.log('all user', res.data);
            return res ;
        } catch(e) {

        }
        setLoading(false)
    }

    const updateUser = async (id: string, body: {_id: string; favorites?: string[]; booked?: string[]; type?: string; email: string; firstname: string; lastname: string; phone: string}) => {
        console.log(body)
        const config = {
            headers: {'content-type': 'application/json'}
        }
        try {
            const res = await axios.put(`https://polar-ridge-98480.herokuapp.com/api/users/${id}`, body, config);
            console.log('update', res)
            return res;
          } catch (e) {
            
        } 
    }

    const handleFirstNameInput= (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, firstname: e.target.value})
    }
    const handleLastNameInput= (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, lastname: e.target.value})
    }
    const handleEmailInput= (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, email: e.target.value})
    }
    const handlePasswordInput= (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, password: e.target.value})
    }
    const handleConfirmPasswordInput= (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value)
    }
    const handlePhoneInput= (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, phone: e.target.value})
    }
    const handleOption = (e: ChangeEvent<HTMLSelectElement>) => {
        setLoginType(e.target.value)
    }


    const handleSignupSubmit= async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const emailStatus = status('email');
        const passwordStatus = status('password');
        if (emailStatus !== '' || passwordStatus !== '') {
            console.log(emailStatus, passwordStatus);
        }

        const body = {...userData, type: userType , favorites: [], booked: []};
          const data = await signUp(body);
          console.log(data)
        if (data && data.status === 200) {
            setLoggedIn(true);
            setLoggedInUserData(data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
            setShow(false);
            if(userType === "host") history.replace('/host/hostform')
        }
         
    }

    const handleLoginSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const body = {email: userData.email, password: userData.password, type: loginType};
        const data = await Login(body);
        if (data && data.status === 200) {
            setLoggedIn(true);
            setLoggedInUserData(data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
            setShow(false);
            if(userType === "host") history.replace('/home')
        }
    }

    return (
        <AuthContext.Provider value={{
            loading,
            route: props.location.pathname,
            show,
            signIn,
            logout,
            loginType,
            guestSignUp,
            hostSignUp,
            isSignup,
            toggleModal,
            formError,
            data: userData,
            userData: loggedInUserData,
            userType,
            loggedIn,
            roomList,
            fetchRoomList,
            handleRoomView,
            roomView,
            updateGuestHost,
            favorites,
            handleFavorites,
            booked,
            handleBooked,
            submitBooking,
            passwordConfirmation,
            handleFirstNameInput,
            handleLastNameInput,
            handleEmailInput,
            handlePasswordInput,
            handleConfirmPasswordInput,
            handleOption,
            handlePhoneInput,
            handleSignupSubmit,
            handleLoginSubmit,
            searchResults,
            handleSearchResults,
            showResults

        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const AuthContextProvider = withRouter(AuthComponet);
export default AuthContext;