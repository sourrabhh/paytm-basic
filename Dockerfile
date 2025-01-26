FROM mongo:7.0

# Add replica set initialization script
RUN echo "rs.initiate();" > /docker-entrypoint-initdb.d/replica-init.js

# Enable replica set mode
CMD [ "--replSet", "rs" ]