module.exports = {
  apps: [{
    name: 'wpomalaza',
    script: './server.js',
    cwd: '/home/u775134753/wpomalaza/current',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Graceful shutdown settings
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
    // Auto restart on crash
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    // Logging
    error_file: '/home/u775134753/wpomalaza/logs/error.log',
    out_file: '/home/u775134753/wpomalaza/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
