const Config={
    ROSBRIDGE_SERVER_IP: "192.168.1.112",
    ROSBRIDGE_SERVER_PORT: "9090",
    RECONNECTION_TIMER: 3600,

    CMD_VEL_TOPIC:"/cmd_vel",
    CMD_MESS_TYPE: "geometry_msgs/Twist",
    ODOM_TOPIC: "/odom",
    POSE_TOPIC: "/amcl_pose",

};

export default Config;