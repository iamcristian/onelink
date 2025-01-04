
## Docker Instructions
1) Run "docker-compose build" to build the images.
2) Then "docker-compose up -d" to start the containers in the background.
3) To stop them, use "docker-compose down".

**Step-by-Step Solution**  
1. Run "docker-compose up -d".  
2. Open your browser and go to http://localhost:5173 to see the frontend.  
3. The backend will be available at http://localhost:4000.  
4. If you are using another machine on the local network, replace "localhost" with the IP of the machine running Docker.

## Notes on Restart
If you turn off your computer and turn it back on, you will need to run "docker-compose up -d" to start the containers unless you configure a restart policy (e.g. "restart: always") in the docker-compose.yml file.