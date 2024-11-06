# Define directories
BACKEND_DIR=chat-app
FRONTEND_DIR=next-chat

# Define commands to start each part
run-backend:
	@if [ ! -f "$(BACKEND_DIR)/go.sum" ]; then \
		echo "Installing backend dependencies..."; \
		cd $(BACKEND_DIR) && go mod download; \
	fi
	cd $(BACKEND_DIR) && go run main.go

run-frontend:
	@if [ ! -d "$(FRONTEND_DIR)/node_modules" ]; then \
		echo "Installing frontend dependencies..."; \
		cd $(FRONTEND_DIR) && npm install; \
	fi
	cd $(FRONTEND_DIR) && npm run dev

# Command to run both in parallel
run: run-backend run-frontend

# Stop both (if needed for cleanup)
stop:
	kill $(shell jobs -p) 2>/dev/null || true

# Install dependencies explicitly
install-backend:
	cd $(BACKEND_DIR) && go mod download

install-frontend:
	cd $(FRONTEND_DIR) && npm install

install: install-backend install-frontend
