Project Report: The Smart Clip
A Cost-Effective Solution for Detecting Low-Voltage AC Distribution Over Head
Conductor Breakage
1. Introduction
The "Smart Clip" is a mini-project designed to solve a critical public safety and grid reliability
problem: the undetected breakage of low-voltage (LV) AC overhead conductors. The solution
leverages a modern, Internet of Things (IoT) approach to provide real-time alerts, which are
often missed by conventional grid protection systems.
2. Problem Statement
A broken power line that falls to the ground can create a High-Impedance Fault (HIF). This
fault doesn't cause a large surge in current, so it is often missed by traditional fuses and
circuit breakers. As a result, the wire remains live and poses a severe risk of electrocution, fire,
and property damage. Existing solutions are often expensive, making them impractical for
widespread deployment across India's vast and dense LV distribution network.
3. Proposed Solution: The "Smart Clip"
The "Smart Clip" is a cost-effective and scalable system that provides a proactive solution.
It consists of three main components: a low-cost hardware device, a backend server for data
processing, and a real-time monitoring dashboard.
4. Technical Architecture
The project's architecture is a full-stack IoT system designed for reliability and efficiency.
A. Hardware: The Smart Clip Device
The physical device is a self-contained unit designed to be non-invasively attached to an
overhead conductor.
Component Usage
Microcontroller (ESP32) The "brain" of the device. It processes
sensor data and controls communication.
Sensors ZMPT101B (Voltage) and SCT-013-000
(Current). These measure the electrical
properties of the line.
LoRa Module A wireless communication module for
sending small, long-range, low-power
alerts.
Power Source A small solar panel and LiPo battery for
autonomous, self-sustaining operation.
The device runs an algorithm at the edge to detect the unique electrical signature of a broken
conductor (a voltage drop without a corresponding current increase) before sending an alert.
B. Backend: The API Server
The backend is built with Node.js and Express.js. Its role is to serve as the central hub for all
alerts.
● API Endpoint: A POST endpoint receives JSON data from a LoRaWAN gateway.
● Database: A simple JSON file (alerts.json) or SQLite stores a log of all received alerts,
including the device ID, location, and timestamp.
● Data API: A GET endpoint provides the alert data to the frontend for display.
C. Frontend: The Dashboard
The dashboard is a single-page application built with React.js.
● Mapping: The project uses the React-Leaflet library with OpenStreetMap to visualize
alerts on a map.
● Real-time Alerts: The dashboard fetches data from the backend every few seconds,
displaying new alerts as markers on the map and as entries in a list.
● Audio Alert System: A key feature is the audio alert system. Due to browser security
policies, a button is provided for the user to enable sound. Once enabled, an alert sound
plays automatically upon the arrival of a new, unread alert.
5. Conclusion and Impact
This project demonstrates a viable and scalable solution to a critical infrastructure problem.
By leveraging low-cost hardware, modern wireless communication (LoRaWAN), and
real-time data visualization, the "Smart Clip" system offers the following benefits:
● Enhanced Public Safety: Enables immediate dispatch of crews to a dangerous location.
● Improved Grid Reliability: Allows for faster resolution of power outages.
● Cost-Effectiveness: The low per-unit cost makes it practical for mass deployment.
● Proactive Maintenance: Shifts the utility's response from reactive (waiting for a
customer complaint) to proactive, ensuring a safer and more efficient power grid.
