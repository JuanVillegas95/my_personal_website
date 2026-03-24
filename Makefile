.PHONY: dev up down db-shell clean \
        frontend-dev backend-dev frontend-build frontend-install

POSTGRES_DB       ?= appdb
POSTGRES_USER     ?= appuser
POSTGRES_PASSWORD ?= apppassword
POSTGRES_PORT     ?= 5432

# ── Environment ───────────────────────────────────────────────────────────────
export JAVA_HOME  = /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
export PATH      := /opt/homebrew/opt/openjdk@21/bin:$(PATH)
NVM_INIT          = export NVM_DIR="$$HOME/.nvm" && . "$$NVM_DIR/nvm.sh" && nvm use 20

# ── One command to rule them all ─────────────────────────────────────────────
dev: db-start
	$(NVM_INIT) && make -j2 backend-dev frontend-dev

# ── Database ──────────────────────────────────────────────────────────────────
db-start:
	@if [ ! "$$(docker ps -q -f name=app_db)" ]; then \
		if [ "$$(docker ps -aq -f name=app_db)" ]; then \
			docker start app_db; \
		else \
			docker run -d \
				--name app_db \
				-e POSTGRES_DB=$(POSTGRES_DB) \
				-e POSTGRES_USER=$(POSTGRES_USER) \
				-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
				-p $(POSTGRES_PORT):5432 \
				-v postgres_data:/var/lib/postgresql/data \
				postgres:16-alpine; \
		fi \
	else \
		echo "postgres already running"; \
	fi

db-stop:
	docker stop app_db

db-shell:
	docker exec -it app_db psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

# ── Local dev ─────────────────────────────────────────────────────────────────
frontend-install:
	$(NVM_INIT) && cd frontend && npm install

frontend-dev:
	$(NVM_INIT) && cd frontend && npm run dev

frontend-build:
	$(NVM_INIT) && cd frontend && npm run build

backend-dev:
	cd backend && ./gradlew bootRun

# ── Clean ─────────────────────────────────────────────────────────────────────
clean:
	docker stop app_db && docker rm app_db && docker volume rm postgres_data