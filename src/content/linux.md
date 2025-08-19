# Linux Command Line Cheatsheet

## File System Navigation

### Basic Navigation
```bash
# Print working directory
pwd

# List directory contents
ls                    # Basic listing
ls -l                 # Long format
ls -la                # Long format with hidden files
ls -lh                # Human readable sizes
ls -lt                # Sort by modification time
ls -lS                # Sort by file size

# Change directory
cd /path/to/directory
cd ..                 # Parent directory
cd ~                  # Home directory
cd -                  # Previous directory
cd                    # Home directory (shortcut)

# Create directories
mkdir directory_name
mkdir -p path/to/nested/directory  # Create parent directories

# Remove directories
rmdir directory_name              # Remove empty directory
rm -r directory_name             # Remove directory and contents
rm -rf directory_name            # Force remove (dangerous!)
```

## File Operations

### Basic File Commands
```bash
# Create files
touch filename.txt
echo "content" > filename.txt    # Create with content
echo "more content" >> filename.txt  # Append content

# Copy files
cp source.txt destination.txt
cp -r source_dir/ destination_dir/  # Copy directory recursively
cp -p source.txt dest.txt          # Preserve permissions/timestamps

# Move/rename files
mv old_name.txt new_name.txt
mv file.txt /path/to/destination/

# Remove files
rm filename.txt
rm -f filename.txt               # Force remove
rm *.txt                        # Remove all .txt files
rm -i *.txt                     # Interactive removal

# Create symbolic links
ln -s /path/to/original /path/to/link
```

### File Permissions
```bash
# View permissions
ls -l filename.txt

# Change permissions (numeric)
chmod 755 script.sh             # rwxr-xr-x
chmod 644 document.txt          # rw-r--r--
chmod 600 private.txt           # rw-------

# Change permissions (symbolic)
chmod +x script.sh              # Add execute permission
chmod -w file.txt               # Remove write permission
chmod u+w,g-r,o-r file.txt      # User add write, group/others remove read

# Change ownership
chown user:group filename.txt
chown -R user:group directory/   # Recursive

# Change group
chgrp groupname filename.txt
```

## Text Processing

### Viewing File Contents
```bash
# Display entire file
cat filename.txt
cat file1.txt file2.txt         # Concatenate files

# Display with line numbers
cat -n filename.txt
nl filename.txt

# View file page by page
less filename.txt
more filename.txt

# Display first/last lines
head filename.txt               # First 10 lines
head -n 20 filename.txt        # First 20 lines
tail filename.txt              # Last 10 lines
tail -n 20 filename.txt        # Last 20 lines
tail -f log.txt                # Follow file changes
```

### Search and Filter
```bash
# Search for text in files
grep "pattern" filename.txt
grep -i "pattern" file.txt      # Case insensitive
grep -r "pattern" directory/    # Recursive search
grep -n "pattern" file.txt      # Show line numbers
grep -v "pattern" file.txt      # Invert match (exclude)
grep -E "regex" file.txt        # Extended regex

# Find files
find /path -name "*.txt"        # Find by filename
find /path -type f -name "*.log"  # Find files only
find /path -type d -name "temp"   # Find directories only
find /path -size +100M          # Files larger than 100MB
find /path -mtime -7            # Modified in last 7 days
find /path -user username       # Files owned by user

# Locate files (faster, uses database)
locate filename.txt
updatedb                        # Update locate database
```

### Text Manipulation
```bash
# Sort lines
sort filename.txt
sort -r filename.txt            # Reverse sort
sort -n numbers.txt             # Numeric sort
sort -u filename.txt            # Remove duplicates

# Remove duplicate lines
uniq filename.txt
sort filename.txt | uniq        # Sort then remove duplicates

# Count lines, words, characters
wc filename.txt
wc -l filename.txt              # Count lines only
wc -w filename.txt              # Count words only
wc -c filename.txt              # Count characters only

# Cut columns
cut -d',' -f1,3 data.csv        # Cut columns 1 and 3 (comma separated)
cut -c1-10 filename.txt         # Cut characters 1-10

# Replace text
sed 's/old/new/' filename.txt           # Replace first occurrence
sed 's/old/new/g' filename.txt          # Replace all occurrences
sed -i 's/old/new/g' filename.txt       # In-place replacement

# Advanced text processing
awk '{print $1}' filename.txt           # Print first column
awk -F',' '{print $2}' data.csv         # Print second column (comma separated)
awk '{sum+=$1} END {print sum}' numbers.txt  # Sum first column
```

## Process Management

### Viewing Processes
```bash
# List running processes
ps                              # Current user processes
ps aux                          # All processes (detailed)
ps -ef                          # All processes (different format)
ps -u username                  # Processes for specific user

# Real-time process monitor
top                             # Basic process monitor
htop                            # Enhanced process monitor (if installed)

# Process tree
pstree                          # Show process hierarchy
pstree -p                       # Show PIDs
```

### Managing Processes
```bash
# Background and foreground
command &                       # Run command in background
jobs                           # List background jobs
fg %1                          # Bring job 1 to foreground
bg %1                          # Send job 1 to background
nohup command &                # Run command immune to hangups

# Kill processes
kill PID                       # Terminate process by PID
kill -9 PID                    # Force kill process
killall process_name           # Kill all processes by name
pkill pattern                  # Kill processes matching pattern

# Control running processes
Ctrl+C                         # Interrupt (SIGINT)
Ctrl+Z                         # Suspend (SIGTSTP)
Ctrl+\                         # Quit (SIGQUIT)
```

## System Information

### Hardware Information
```bash
# CPU information
lscpu
cat /proc/cpuinfo

# Memory information
free -h                        # Human readable format
cat /proc/meminfo

# Disk usage
df -h                          # Disk space usage
du -h directory/               # Directory size
du -sh *                       # Size of all items in current directory

# Hardware listing
lshw                           # List all hardware
lsblk                          # List block devices
lsusb                          # List USB devices
lspci                          # List PCI devices
```

### System Status
```bash
# System uptime
uptime

# Current users
who
w                              # More detailed user info
whoami                         # Current username
id                             # User and group IDs

# System information
uname -a                       # All system info
uname -r                       # Kernel version
hostname                       # System hostname
date                           # Current date and time
cal                           # Calendar
```

## Network Commands

### Network Information
```bash
# Network interfaces
ip addr show                   # Show IP addresses
ifconfig                       # Network interface configuration
ip route show                  # Show routing table

# Network connectivity
ping google.com                # Test connectivity
ping -c 4 google.com          # Send 4 packets only
traceroute google.com         # Trace route to destination
mtr google.com                # Continuous traceroute

# Port and connections
netstat -tuln                 # List listening ports
ss -tuln                      # Modern replacement for netstat
lsof -i :80                   # Show what's using port 80
```

### Network Tools
```bash
# Download files
wget https://example.com/file.txt
curl -O https://example.com/file.txt
curl -L https://example.com/file.txt  # Follow redirects

# Transfer files
scp file.txt user@host:/path/         # Secure copy to remote
scp user@host:/path/file.txt ./       # Secure copy from remote
rsync -av source/ destination/        # Sync directories
rsync -av source/ user@host:dest/     # Sync to remote
```

## Archive and Compression

### Tar Archives
```bash
# Create archives
tar -cvf archive.tar files/           # Create tar archive
tar -czvf archive.tar.gz files/       # Create compressed (gzip) archive
tar -cjvf archive.tar.bz2 files/      # Create compressed (bzip2) archive

# Extract archives
tar -xvf archive.tar                  # Extract tar archive
tar -xzvf archive.tar.gz              # Extract gzip compressed archive
tar -xjvf archive.tar.bz2             # Extract bzip2 compressed archive

# List archive contents
tar -tvf archive.tar                  # List contents without extracting
```

### Compression
```bash
# Gzip compression
gzip file.txt                         # Compress file (creates file.txt.gz)
gunzip file.txt.gz                    # Decompress file
zcat file.txt.gz                      # View compressed file

# Zip archives
zip archive.zip file1.txt file2.txt   # Create zip archive
zip -r archive.zip directory/         # Zip directory recursively
unzip archive.zip                     # Extract zip archive
unzip -l archive.zip                  # List zip contents
```

## Environment and Variables

### Environment Variables
```bash
# View environment variables
env                                    # All environment variables
echo $PATH                            # View PATH variable
echo $HOME                            # Home directory
echo $USER                            # Current username

# Set variables
export VAR_NAME="value"               # Set environment variable
unset VAR_NAME                        # Remove variable

# Modify PATH
export PATH=$PATH:/new/path           # Add to PATH
export PATH=/new/path:$PATH           # Prepend to PATH
```

### Shell Configuration
```bash
# Configuration files
~/.bashrc                             # Bash configuration
~/.bash_profile                       # Bash login configuration
~/.profile                            # Shell-independent configuration

# Reload configuration
source ~/.bashrc
. ~/.bashrc                           # Alternative syntax

# Command history
history                               # Show command history
history | grep "command"              # Search history
!!                                    # Repeat last command
!n                                    # Repeat command number n
!string                               # Repeat last command starting with string
```

## Input/Output Redirection

### Redirection Operators
```bash
# Output redirection
command > file.txt                    # Redirect stdout to file (overwrite)
command >> file.txt                   # Redirect stdout to file (append)
command 2> error.log                  # Redirect stderr to file
command > output.txt 2>&1             # Redirect both stdout and stderr
command &> all_output.txt             # Redirect both (shorthand)

# Input redirection
command < input.txt                   # Use file as input

# Pipes
command1 | command2                   # Pipe output of command1 to command2
command1 | command2 | command3        # Chain multiple commands
```

### Useful Pipe Combinations
```bash
# Count files in directory
ls | wc -l

# Find largest files
du -a | sort -nr | head -10

# Find most frequent commands
history | awk '{print $2}' | sort | uniq -c | sort -nr | head -10

# Monitor log files
tail -f /var/log/system.log | grep ERROR

# Process monitoring
ps aux | grep process_name
```

## System Services (systemd)

### Service Management
```bash
# Control services
sudo systemctl start service_name     # Start service
sudo systemctl stop service_name      # Stop service
sudo systemctl restart service_name   # Restart service
sudo systemctl reload service_name    # Reload configuration

# Service status
systemctl status service_name         # Check service status
systemctl is-active service_name      # Check if service is running
systemctl is-enabled service_name     # Check if service is enabled

# Enable/disable services
sudo systemctl enable service_name    # Enable service at boot
sudo systemctl disable service_name   # Disable service at boot

# List services
systemctl list-units --type=service   # List all services
systemctl list-units --failed         # List failed services
```

## Package Management

### APT (Debian/Ubuntu)
```bash
# Update package database
sudo apt update

# Upgrade packages
sudo apt upgrade
sudo apt full-upgrade                 # More comprehensive upgrade

# Install/remove packages
sudo apt install package_name
sudo apt remove package_name
sudo apt purge package_name           # Remove package and config files

# Search packages
apt search keyword
apt show package_name                 # Show package details

# Clean up
sudo apt autoremove                   # Remove unnecessary packages
sudo apt autoclean                    # Clean package cache
```

### YUM/DNF (Red Hat/CentOS/Fedora)
```bash
# Install/remove packages
sudo yum install package_name         # CentOS/RHEL
sudo dnf install package_name         # Fedora
sudo yum remove package_name

# Update packages
sudo yum update
sudo dnf upgrade

# Search packages
yum search keyword
dnf search keyword
```

## Useful Shortcuts and Tips

### Keyboard Shortcuts
```bash
Ctrl+A          # Move to beginning of line
Ctrl+E          # Move to end of line
Ctrl+U          # Clear line before cursor
Ctrl+K          # Clear line after cursor
Ctrl+W          # Delete word before cursor
Ctrl+L          # Clear screen
Ctrl+R          # Search command history
Ctrl+C          # Interrupt current command
Ctrl+Z          # Suspend current command
Ctrl+D          # Exit current shell
```

### Command Line Tips
```bash
# Command substitution
echo "Today is $(date)"
echo "Files: $(ls | wc -l)"

# Brace expansion
echo {1..10}                          # Numbers 1 to 10
echo {a..z}                           # Letters a to z
mkdir test_{1..5}                     # Create multiple directories

# Wildcards
*.txt                                 # All .txt files
file?.txt                            # file1.txt, fileA.txt, etc.
file[0-9].txt                        # file0.txt to file9.txt
file[!0-9].txt                       # All except file0-9.txt

# Command chaining
command1 && command2                  # Run command2 only if command1 succeeds
command1 || command2                  # Run command2 only if command1 fails
command1; command2                    # Run both commands regardless
```

This cheatsheet covers the most essential Linux commands for everyday use. Practice these commands to become proficient with the Linux command line!
