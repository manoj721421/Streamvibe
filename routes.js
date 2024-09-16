import { Component, lazy } from "react";

const Home = lazy(()=> import ("./src/Components/Homepage"));
const Movies = lazy(()=> import ("./src/Components/Movies"));
const Support = lazy(()=> import ("./src/Components/Support"));
const Subscription = lazy(()=> import ("./src/Components/Subscription"));
const NotFound404 = lazy(()=> import ("./src/SharedComponets/Error404"));


const routes = [
    {path:"/", component : Home},
    {path:"/", component : Movies},
    {path:"/", component : Support},
    {path:"/", component : Subscription},
    {path:"/", component : NotFound404},
]; 

export default routes;