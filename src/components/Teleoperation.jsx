import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config";
class Teleoperation extends Component {
    state = {ros: null};
    constructor(){
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    init_connection(){
        // eslint-disable-next-line
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established!");
            this.setState({ connected: true});

        });
        this.state.ros.on("close",() => {
            console.log("connection is closed!");
            this.setState({connected: false});

            // try to reconnect
            setTimeout(() => {

                try {
                    this.state.ros.connect(
                        "ws://" + 
                        Config.ROSBRIDGE_SERVER_IP + 
                        ":" + 
                        Config.ROSBRIDGE_SERVER_PORT +
                        ""
                    ); 
                }catch(error){
                    console.log("connection problem ");
                }      

            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect(
                "ws://" + 
                Config.ROSBRIDGE_SERVER_IP + 
                ":" + 
                Config.ROSBRIDGE_SERVER_PORT +
                ""        
            ); 
        }catch(error){
            console.log("connection problem ");
        }      
        
    }
    handleMove(event){
        console.log("handle move");
        //we need to create a ROS publisher on the cmd_vel

        //we need to create a twist messge for the rosbridge
        
        // eslint-disable-next-line
        var cmd_vel = new window.ROSLIB.Topic(
            {
                ros: this.state.ros,
                name: Config.CMD_VEL_TOPIC,
                messageType: Config.CMD_MESS_TYPE,

            });
            
            var twist = new window.ROSLIB.Message({
                linear: {
                    x: event.y,
                    y: 0,
                    z: 0,
                },
              angular: {
                    x: 0,
                    y: 0,
                    z: -event.x,
                },

            });
            cmd_vel.publish(twist)
    }
    handleStop(event){
        console.log("handle stop");

        var cmd_vel = new window.ROSLIB.Topic(
            {
                ros: this.state.ros,
                name: Config.CMD_VEL_TOPIC,
                messageType: Config.CMD_MESS_TYPE,

            });

            var twist = new window.ROSLIB.Message({
                linear: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
              angular: {
                    x: 0,
                    y: 0,
                    z: 0,
                },

            });
            cmd_vel.publish(twist)
    }
    render(){
        return(
            <div>
                <Joystick size={100} 
                baseColor="#00008B" 
                stickColor="#A9A9A9"
                move={this.handleMove}>
                </Joystick>
            </div>                              
        );
    }
}

export default Teleoperation;