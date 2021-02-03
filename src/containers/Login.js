import React, { useState } from "react";
import Posts from './Posts';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        // var apiBaseUrl = "https://dev.tuten.cl/TutenREST/rest/user/testapis@tuten.cl";
        var apiBaseUrl1 = "https://dev.tuten.cl/TutenREST/rest/user/" + email;
        var apiBaseUrl2 = "https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true";
        var app = "APP_BCK"
        console.log("values", email, password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var headers1 = {
            "password": password,
            "app": app
        }

        console.log("headers", headers1);
        
        axios.put(apiBaseUrl1, {}, {
            headers : headers1})
            .then(function (response) {
                console.log(response);
                console.log(response.data.sessionTokenBck);
                if (response.status == 200) {
                    setShow(true)
                   console.log("Listo!!!");

                   var headers2 = {
                    "adminemail" : email,
                    "password": password,
                    "app": app,
                    "token" : response.data.sessionTokenBck
                    }

                    console.log("headers", headers2);

                   axios.get(apiBaseUrl2, {
                    headers : headers2})
                    .then(function (response) {
                        setPosts(response.data);
                    }).catch(function (error) {
                        console.log(error);
                    });


                }
            }).catch(function (error) {
                console.log(error);
            });
            event.preventDefault();
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        placeholder="testapis@tuten.cl"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
            {show ? <Posts posts={posts} /> : null}
        </div>
    );
}