z# BlinkME
# IMCA 6th SEM - Minor Project

## Project Overview
**BlinkME** is a full-stack end-to-end encrypted messaging application that replicates the core functionalities of WhatsApp where each user can create their profile including their profile picture, status and bio. It supports real-time one-to-one and group messaging, media sharing via relative URLs. The project leverages both HTTP and WebSocket (STOMP) protocols to provide a robust, secure, and interactive chat experience.

## Features
- **Authentication Using jwt**
   - User login and logout are taken care by JSON Web Tokens.
- **Real-Time Messaging:**  
  - One-to-one and group chats implemented with WebSockets (STOMP protocol) for instant communication.
- **Media Sharing:**  
  - Users can upload media from their computer. The media is stored on the server via HTTP Protocol (e.g., in `C:/uploads/chat`) and is shared via relative URLs.
- **User Blocking & Management:**  
  - Manage unwanted messages and chat groups.
- **User Profile and Staus**
  - Users can add profile picture, status and bio.
- **Group Chats**
  - There are 2 types of groups public and private. Multiple users can chat in a group along media sharing. Other group functionalities like join request, removal, roles etc. are also implemented.

## Technologies & Libraries Used
- **Backend:**  
  - Java, Spring Boot
  - Spring Data JPA, Hibernate
  - Spring WebSocket (STOMP), Spring Security, JWT  
  - PostgreSQL  
- **Frontend:**  
  - Vite, React.js  
  - HTML, CSS, JavaScript  
  - SockJS, STOMP.js   
- **Build Tools:**  
  - Maven for backend, Vite for frontend

## Installation & Setup

### Prerequisites
- Java 11 or higher
- PostgreSQL Database
- Maven
- React.js (for frontend using Vite)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/JeansPanT/BlinkMe.git

### Team Members

1. Siddharth Kar (0810CA22DD57) -> Project Lead & Full Stack
2. Megha More (0810CA22DD32) -> Frontend & UI UX
3. Divyanshu Dwivedi (0810CA22DD12)-> DevOps & Database Specialist