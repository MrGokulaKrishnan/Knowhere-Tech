import type { Lesson } from '@/types';

export const LINUX_LESSONS: Lesson[] = [
  {
    id: 'linux-basics',
    moduleKey: 'linux',
    title: 'Linux Command Line — Essential Developer Commands',
    slug: 'basics',
    difficulty: 'beginner',
    duration: 14,
    order: 1,
    prerequisites: [],
    tags: ['linux', 'bash', 'terminal', 'cli', 'commands', 'shell'],
    explanation: 'Linux powers over 90% of the world\'s servers, all major cloud platforms (AWS, GCP, Azure), and every Docker container. As a Java Full Stack developer, you will SSH into Linux servers to deploy applications, read logs, manage services, and debug production issues. Mastering the command line is non-negotiable.',
    beginnerExplanation: 'The Linux terminal is like texting with your computer instead of using a mouse. Instead of clicking on folders to navigate, you type commands. Instead of right-clicking to copy a file, you type "cp". It feels intimidating at first, but you\'ll use the same 20 commands 80% of the time — and you\'ll be much faster than any GUI once you know them.',
    technicalExplanation: 'The shell (bash/zsh) is a command interpreter that reads your input, parses it into command + arguments + options, forks a child process, execs the binary from PATH, and returns exit code 0 (success) or non-zero (error). Everything in Linux is a file — devices (/dev), processes (/proc), network sockets — enabling uniform read/write/pipe operations. Pipes (|) connect stdout of one command to stdin of the next, enabling powerful composition.',
    keyPoints: [
      'pwd — Print Working Directory: shows your current location in the filesystem',
      'ls -la — Lists all files including hidden (.) with permissions, size, owner',
      'cd <dir> — Change Directory: cd .. goes up one level, cd ~ goes to home',
      'mkdir -p path/to/dir — Make Directory: -p creates parent directories too',
      'cp -r source dest — Copy: -r copies directories recursively',
      'mv source dest — Move or Rename files/directories',
      'cat / less / tail -f — Read files: tail -f streams live updates (for logs)',
      'grep -r "pattern" . — Search for text inside files recursively'
    ],
    codeExample: `# Navigate the filesystem
pwd                          # Where am I? → /home/user
ls -la                       # List all files with details
cd /var/log                  # Navigate to the logs directory
cd ~                         # Jump to home directory instantly

# Create project structure
mkdir -p ~/projects/knowhere/src/main/java
cd ~/projects/knowhere

# File operations
cp README.md README.backup.md        # Copy a file
mv README.backup.md docs/            # Move it to docs/
rm -rf target/                       # Delete directory and all contents (CAREFUL!)

# Reading files and logs
cat application.properties           # Print entire file
less application.log                 # Scrollable viewer (q to quit)
tail -f /var/log/app/spring.log      # Stream live log updates
head -20 data.csv                    # First 20 lines

# Search inside files
grep -r "NullPointerException" /var/log/    # Find error across all logs
grep -n "TODO" src/Main.java               # Show line numbers
grep -i "error" app.log | tail -50         # Case-insensitive, last 50 matches

# Pipes — combine commands
cat access.log | grep "POST" | wc -l   # Count POST requests`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'ls -la', token: '-la', explanation: '-l = long format (permissions, size, date); -a = all (shows hidden files starting with .) Combined: -la shows everything in detail.' },
      { code: 'tail -f /var/log/app/spring.log', token: 'tail -f', explanation: '-f means "follow" — keeps the file open and prints new lines as they are written. Essential for watching live Spring Boot logs during deployment.' },
      { code: 'grep -r "NullPointerException" /var/log/', token: 'grep -r', explanation: '-r = recursive, searches through all files in the directory. Returns filename:lineNumber:matched_line for each hit.' },
      { code: 'cat access.log | grep "POST" | wc -l', token: '|', explanation: 'Pipe chains: cat reads the file → grep filters for POST → wc -l counts lines. Each command processes the output of the previous one.' }
    ],
    visualizer: 'linux-terminal',
    quiz: [
      {
        id: 'q-linux-1',
        type: 'mcq',
        question: 'Which command shows real-time updates to a log file as new lines are written?',
        options: ['cat application.log', 'less application.log', 'tail -f application.log', 'grep application.log'],
        answer: 2,
        explanation: '"tail -f" (follow) keeps the file open and continuously prints new content as it arrives. This is essential when watching Spring Boot startup logs or monitoring production errors in real time.',
        points: 15
      },
      {
        id: 'q-linux-2',
        type: 'mcq',
        question: 'What does the pipe symbol | do in "cat access.log | grep ERROR | wc -l"?',
        options: [
          'Creates a file named "|" between the commands',
          'Sends the output of each command as input to the next command',
          'Runs all three commands at the same time in parallel',
          'Separates commands to run them only if the previous command succeeds'
        ],
        answer: 1,
        explanation: 'The pipe | passes the stdout (output) of the left command as stdin (input) to the right command. This enables powerful command composition: read file → filter errors → count them. This is one of Linux\'s most powerful features.',
        points: 20
      },
      {
        id: 'q-linux-3',
        type: 'mcq',
        question: 'You want to delete the entire "target" directory and all its contents. Which command is correct?',
        options: ['rm target', 'del target', 'rm -rf target/', 'rmdir target'],
        answer: 2,
        explanation: '"rm -rf target/" uses -r (recursive, removes directories and contents) and -f (force, no confirmation prompts). "rm target" fails on directories. "rmdir" only removes empty directories. Warning: rm -rf is permanent — no recycle bin!',
        points: 15
      }
    ],
    practice: [
      {
        id: 'p-linux-1',
        type: 'predict-output',
        question: 'What does this command do?\ngrep -rn "Exception" /var/log/spring/ | wc -l',
        answer: 'Searches recursively (-r) through all files in /var/log/spring/ for lines containing "Exception", shows line numbers (-n), then pipes the results to wc -l which counts the total number of matching lines. Result: a single number showing how many exceptions are in the logs.',
        hint: 'Break it down: grep finds matches → wc -l counts them'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-linux-1',
        question: 'How would you find the 10 largest files in a directory and its subdirectories?',
        level: 'intermediate',
        answer: 'Use: du -ah /path/to/dir | sort -rh | head -10\n• du -ah = disk usage for all files in human-readable format\n• sort -rh = sort reverse by human-readable size (GB > MB > KB)\n• head -10 = take only the first 10 results\nAlternatively: find /path -type f -exec ls -la {} \\; | sort -k5 -rn | head -10',
        example: 'du -ah /var/log | sort -rh | head -10\n# Shows top 10 largest log files by size'
      }
    ],
    xpReward: 40
  },
  {
    id: 'linux-filesystem',
    moduleKey: 'linux',
    title: 'Linux Filesystem & File Permissions',
    slug: 'filesystem',
    difficulty: 'beginner',
    duration: 13,
    order: 2,
    prerequisites: ['linux-basics'],
    tags: ['linux', 'filesystem', 'permissions', 'chmod', 'chown', 'users', 'groups'],
    explanation: 'The Linux filesystem is a single hierarchical tree starting from root (/). Understanding the directory structure and Unix file permissions (rwx for owner, group, and others) is essential for securely deploying Java applications on servers.',
    beginnerExplanation: 'Linux organizes everything in one big folder tree starting at "/" (root). /home is where user files live, /var/log is where application logs go, /etc is where configuration files live. File permissions are like a security badge system: each file says "the owner can read/write, the team can only read, strangers can do nothing." chmod changes these permissions.',
    technicalExplanation: 'Linux permissions use a 9-bit model: 3 bits each for User (owner), Group, and Others. Each triple is r (read=4), w (write=2), x (execute=1). Numeric notation: chmod 755 = rwxr-xr-x (7=rwx for owner, 5=r-x for group, 5=r-x for others). Symbolic: chmod u+x script.sh (add execute for user). Directories need x permission to enter. SUID (4xxx), SGID (2xxx), Sticky Bit (1xxx) are special permission bits.',
    keyPoints: [
      '/ (root): Top of the entire filesystem tree — everything starts here',
      '/home: User home directories — /home/ubuntu, /home/deploy',
      '/var/log: Application and system logs live here — Spring Boot, Nginx, syslog',
      '/etc: System-wide configuration files — nginx.conf, /etc/hosts, /etc/environment',
      '/usr/local: Manually installed software (Java, Maven, custom tools)',
      '/tmp: Temporary files — cleared on reboot, world-writable',
      'chmod 755 file: Owner=rwx, Group=r-x, Others=r-x (typical for executables)',
      'chmod 644 file: Owner=rw, Group=r, Others=r (typical for config/data files)'
    ],
    codeExample: `# View filesystem structure
ls -la /                    # Root directory contents
df -h                       # Disk usage for each mounted filesystem
du -sh /var/log/*           # Size of each item in /var/log

# View file permissions
ls -la /etc/nginx/nginx.conf
# → -rw-r--r-- 1 root root 1234 Aug 25 09:00 nginx.conf
#   ↑ type      ↑ user ↑ group
#    rwx rw- r--
#    (owner)(group)(others)

# Change permissions (chmod)
chmod 755 deploy.sh         # Owner: rwx, Group: r-x, Others: r-x
chmod 644 config.properties # Owner: rw-, Group: r--, Others: r--
chmod +x startup.sh         # Add execute permission for everyone

# Change ownership (chown)
chown ubuntu:ubuntu /app/logs         # Set owner and group to ubuntu
chown -R deploy:deploy /opt/myapp     # Recursively change entire directory

# Read /etc/hosts (local DNS overrides)
cat /etc/hosts
# → 127.0.0.1   localhost
# → 127.0.0.1   myapp.local

# Add entry (for local dev)
echo "127.0.0.1 api.myapp.local" | sudo tee -a /etc/hosts`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'ls -la', token: '-rw-r--r--', explanation: 'Permission string format: - (type: - file, d dir, l symlink) rw- (owner: read+write) r-- (group: read only) r-- (others: read only).' },
      { code: 'chmod 755 deploy.sh', token: '755', explanation: '7=rwx (4+2+1), 5=r-x (4+0+1), 5=r-x. Owner can read/write/execute; group and others can only read and execute — typical for shell scripts.' },
      { code: 'chown -R deploy:deploy /opt/myapp', token: 'chown -R', explanation: 'Changes the owner and group of /opt/myapp and ALL files inside (-R recursive). Crucial after copying files as root — your deploy user needs ownership to read/write them.' }
    ],
    quiz: [
      {
        id: 'q-linux-4',
        type: 'mcq',
        question: 'A file shows permissions "-rwxr-xr--". Who can execute this file?',
        options: [
          'Only the file owner',
          'The owner and members of the file\'s group',
          'The owner, group, and all others',
          'No one — x permission is not set'
        ],
        answer: 1,
        explanation: 'Breaking down "-rwxr-xr--": type=file(-), owner=rwx(execute YES), group=r-x(execute YES), others=r--(execute NO). So the owner and group members can execute it, but others cannot.',
        points: 20
      },
      {
        id: 'q-linux-5',
        type: 'mcq',
        question: 'Your Spring Boot app logs are stored in /var/log/myapp/. Which chmod value should the log directory have so your app (running as user "appuser") can write logs, but others cannot?',
        options: ['chmod 777 /var/log/myapp', 'chmod 755 /var/log/myapp', 'chmod 700 /var/log/myapp', 'chmod 644 /var/log/myapp'],
        answer: 2,
        explanation: 'chmod 700 means only the owner (appuser) has rwx (read/write/execute=enter directory). Group and others have no permissions. This is the most secure option for log directories containing potentially sensitive application data.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-linux-2',
        type: 'explain',
        question: 'Convert this symbolic permission to octal: -rwxr-x---',
        answer: 'Owner: rwx = 4+2+1 = 7\nGroup: r-x = 4+0+1 = 5\nOthers: --- = 0+0+0 = 0\nResult: chmod 750',
        hint: 'r=4, w=2, x=1. Add up each group\'s values separately.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-linux-2',
        question: 'Explain Unix file permissions and how you would secure a Java application\'s config file containing database passwords.',
        level: 'intermediate',
        answer: 'Unix permissions use 9 bits: rwx for owner, group, and others. For a config file with passwords: 1) chown appuser:appgroup application.properties (set correct owner). 2) chmod 600 application.properties (only owner can read/write; group and others have no access). 3) Never store secrets in the file at all — prefer environment variables or AWS Secrets Manager/Vault. The "chmod 600" ensures even other users on the same server cannot read your database password.',
        example: 'chown appuser:appgroup application.properties\nchmod 600 application.properties\n# Verify: ls -la → -rw------- 1 appuser appgroup ...'
      }
    ],
    xpReward: 45
  },
  {
    id: 'linux-processes',
    moduleKey: 'linux',
    title: 'Process Management & System Services',
    slug: 'processes',
    difficulty: 'beginner',
    duration: 12,
    order: 3,
    prerequisites: ['linux-filesystem'],
    tags: ['linux', 'processes', 'systemctl', 'ps', 'top', 'kill', 'service', 'daemon'],
    explanation: 'Every running program on Linux is a process with a unique PID (Process ID). As a developer, you need to manage Java application processes: monitor CPU/memory usage, handle hanging processes, manage system services with systemctl, and control startup/restart behavior.',
    beginnerExplanation: 'Think of processes like apps running on your phone. You can see them all in the task manager (top/htop), close unresponsive ones (kill), or ask them to quit nicely (kill -15). systemctl is like the Settings app for system services — it controls things that run in the background automatically, like your database or web server.',
    technicalExplanation: 'The Linux kernel assigns each process a PID. Process hierarchy: init/systemd (PID 1) is the ancestor of all processes. Signals are OS-level interrupts: SIGTERM (15) requests graceful shutdown, SIGKILL (9) immediately terminates (cannot be caught/ignored). systemd manages services via unit files (/etc/systemd/system/*.service), handling start/stop/restart/enable (auto-start on boot). Process states: Running (R), Sleeping (S), Stopped (T), Zombie (Z).',
    keyPoints: [
      'ps aux — Lists all running processes with PID, CPU%, MEM%, and command',
      'top / htop — Interactive real-time process monitor sorted by CPU/memory',
      'kill <PID> — Sends SIGTERM (graceful shutdown request) to a process',
      'kill -9 <PID> — Sends SIGKILL (force kill, immediate) — last resort',
      'pkill -f "java" — Kill all processes matching the pattern',
      'systemctl start/stop/restart/status myapp — Manage system services',
      'systemctl enable myapp — Auto-start service on system boot',
      'journalctl -u myapp -f — View and follow service logs'
    ],
    codeExample: `# View all running processes
ps aux                           # All processes, all users
ps aux | grep java               # Find Java processes specifically
ps aux | grep spring-boot        # Find Spring Boot process

# Real-time monitoring
top                              # Interactive monitor (q to quit)
# htop                           # Better interactive monitor (install with apt)

# Find PID of a process by name
pgrep -f "myapp.jar"             # Returns PID(s)

# Send signals to processes
kill 12345                       # SIGTERM: ask process to stop gracefully
kill -15 12345                   # Same as above (SIGTERM = signal 15)
kill -9 12345                    # SIGKILL: force kill immediately (last resort)
pkill -f "knowhere-api.jar"      # Kill by pattern match

# Manage services with systemctl (systemd)
sudo systemctl status myapp      # Check if service is running
sudo systemctl start myapp       # Start the service
sudo systemctl stop myapp        # Stop the service
sudo systemctl restart myapp     # Restart (stop + start)
sudo systemctl enable myapp      # Auto-start on server reboot
sudo systemctl disable myapp     # Remove auto-start

# View service logs
journalctl -u myapp              # All logs for the service
journalctl -u myapp -f           # Follow live logs
journalctl -u myapp --since "1 hour ago"  # Last hour only

# Example systemd service file for Spring Boot
# /etc/systemd/system/knowhere.service
# [Unit]
# Description=Knowhere Tech Spring Boot API
# After=network.target postgresql.service
# 
# [Service]
# Type=exec
# User=appuser
# ExecStart=/usr/bin/java -jar /opt/knowhere/app.jar
# Restart=on-failure
# RestartSec=10
# 
# [Install]
# WantedBy=multi-user.target`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'ps aux | grep java', token: 'ps aux', explanation: 'ps = process snapshot. a=all users, u=user-oriented format, x=include processes not attached to terminal. Pipe to grep to filter.' },
      { code: 'kill -9 12345', token: 'kill -9', explanation: 'Signal 9 = SIGKILL — cannot be caught, blocked, or ignored by the process. Always prefer "kill" (SIGTERM) first to allow graceful shutdown. Use -9 only when the process is frozen.' },
      { code: 'journalctl -u myapp -f', token: 'journalctl', explanation: 'systemd\'s log viewer. -u specifies the unit/service name. -f follows live like tail -f. Much better than searching raw log files.' }
    ],
    visualizer: 'linux-terminal',
    quiz: [
      {
        id: 'q-linux-6',
        type: 'mcq',
        question: 'Your Spring Boot application is running but not responding to requests. Which command gracefully asks it to shut down first?',
        options: [
          'kill -9 <PID>',
          'rm -rf /opt/myapp',
          'kill <PID>  (or kill -15 <PID>)',
          'poweroff'
        ],
        answer: 2,
        explanation: '"kill <PID>" without a signal number sends SIGTERM (signal 15) by default — a polite shutdown request. The JVM catches this and runs Spring Boot\'s shutdown hooks to close DB connections and finish in-flight requests. kill -9 immediately terminates the process with no cleanup — should only be used if SIGTERM doesn\'t work.',
        points: 20
      },
      {
        id: 'q-linux-7',
        type: 'mcq',
        question: 'Which systemctl command makes a service automatically start when the Linux server reboots?',
        options: ['systemctl start myapp', 'systemctl restart myapp', 'systemctl enable myapp', 'systemctl daemon-reload'],
        answer: 2,
        explanation: '"systemctl enable" creates a symlink in the appropriate systemd target directory so the service starts automatically at boot. "systemctl start" only starts it for the current session. After enable, you still need "systemctl start" to run it immediately.',
        points: 15
      }
    ],
    practice: [
      {
        id: 'p-linux-3',
        type: 'choose-correct',
        question: 'After deploying a new JAR file to /opt/knowhere/app.jar, which commands deploy it correctly?',
        code: 'A: sudo systemctl restart knowhere\nB: kill $(pgrep -f app.jar) && java -jar /opt/knowhere/app.jar\nC: systemctl enable knowhere && systemctl start knowhere\nD: sudo systemctl daemon-reload && sudo systemctl restart knowhere',
        answer: 'D: sudo systemctl daemon-reload && sudo systemctl restart knowhere — daemon-reload refreshes systemd\'s view of the unit files (needed if you changed the .service file), then restart applies the new JAR.',
        hint: 'What if you modified the systemd .service file? What command re-reads it?'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-linux-3',
        question: 'How would you configure a Spring Boot application to run as a Linux service that automatically restarts on failure and starts on server boot?',
        level: 'intermediate',
        answer: 'Create a systemd unit file at /etc/systemd/system/myapp.service:\n[Unit]\nDescription=My Spring Boot App\nAfter=network.target\n\n[Service]\nUser=appuser\nExecStart=/usr/bin/java -jar /opt/myapp/app.jar\nRestart=on-failure\nRestartSec=10\n\n[Install]\nWantedBy=multi-user.target\n\nThen run: sudo systemctl daemon-reload && sudo systemctl enable myapp && sudo systemctl start myapp\nThe Restart=on-failure directive automatically restarts the service if it crashes with a non-zero exit code.',
        example: 'systemctl enable + Restart=on-failure = self-healing service that survives crashes and server reboots'
      }
    ],
    xpReward: 45
  }
];
