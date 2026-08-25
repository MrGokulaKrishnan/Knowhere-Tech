import type { Lesson } from '@/types';

export const AWS_LESSONS: Lesson[] = [
  {
    id: 'aws-intro',
    moduleKey: 'aws',
    title: 'AWS Cloud — Renting the Internet\'s Infrastructure',
    slug: 'intro',
    difficulty: 'beginner',
    duration: 12,
    order: 1,
    prerequisites: [],
    tags: ['aws', 'cloud-computing', 'iaas', 'paas', 'regions', 'availability-zones', 'iam'],
    explanation: 'Amazon Web Services (AWS) is the world\'s largest cloud platform, offering 200+ services for compute, storage, databases, AI/ML, networking, and security. AWS powers Netflix, Airbnb, NASA, and millions of startups. Understanding AWS is essential for deploying and scaling Java Spring Boot applications professionally.',
    beginnerExplanation: 'Before cloud computing, companies bought physical servers and kept them in their own buildings — expensive, inflexible, and wasteful. AWS lets you "rent" computing power by the hour. Need 1000 servers for Black Friday? Rent them for a day, then scale down. You pay only for what you use — like electricity bills instead of buying a power plant. AWS is divided into regions (geographic locations) and services you combine like LEGO blocks.',
    technicalExplanation: 'AWS infrastructure is organized into Regions (geographic clusters: us-east-1, ap-south-1) containing 3+ Availability Zones (AZs — isolated data centers with independent power/cooling/networking). High availability architectures deploy resources across multiple AZs. The AWS Shared Responsibility Model: AWS manages security OF the cloud (physical infra, hypervisor), you manage security IN the cloud (your data, IAM, encryption). IAM (Identity and Access Management) controls API access via Users, Groups, Roles, and Policies (JSON documents defining allow/deny permissions).',
    keyPoints: [
      'Region: Geographic area with 3+ data centers (us-east-1=Virginia, ap-south-1=Mumbai)',
      'Availability Zone (AZ): Isolated data center within a region — deploy across AZs for high availability',
      'IAM: Identity and Access Management — controls who can do what in your AWS account',
      'IAM Roles: Permissions for AWS services (EC2 → read S3 without storing credentials)',
      'AWS Free Tier: 12 months of limited free usage — EC2 t2.micro, 5GB S3, etc.',
      'Pay-as-you-go: Billed per second/hour/request — no upfront hardware costs',
      'AWS CLI: Command-line tool to manage all AWS services programmatically',
      'Principle of Least Privilege: Grant only minimum permissions needed — never use root access'
    ],
    codeExample: `# Install and configure AWS CLI
# Install: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
aws configure
# → AWS Access Key ID: AKIA...
# → AWS Secret Access Key: ...
# → Default region name: ap-south-1
# → Default output format: json

# Verify your identity
aws sts get-caller-identity
# → {
#     "UserId": "AIDAIOSFODNN7EXAMPLE",
#     "Account": "123456789012",
#     "Arn": "arn:aws:iam::123456789012:user/deploy-user"
#   }

# List all S3 buckets in your account
aws s3 ls

# List EC2 instances
aws ec2 describe-instances --query 'Reservations[].Instances[].{
    ID:InstanceId, Type:InstanceType, State:State.Name
}'

# Example IAM policy: allow EC2 to access S3 (JSON)
# {
#   "Version": "2012-10-17",
#   "Statement": [{
#     "Effect": "Allow",
#     "Action": ["s3:GetObject", "s3:PutObject"],
#     "Resource": "arn:aws:s3:::my-app-bucket/*"
#   }]
# }`,
    codeLanguage: 'bash',
    codeLines: [
      { code: 'aws configure', token: 'aws configure', explanation: 'Sets up AWS CLI with your Access Key ID, Secret, region, and output format. Credentials stored in ~/.aws/credentials. NEVER commit this file to Git.' },
      { code: 'aws sts get-caller-identity', token: 'sts get-caller-identity', explanation: 'STS (Security Token Service) verifies your credentials and returns your IAM user/role ARN. Run this first to confirm your CLI is configured correctly.' }
    ],
    quiz: [
      {
        id: 'q-aws-1',
        type: 'mcq',
        question: 'What is an AWS Availability Zone?',
        options: [
          'A separate AWS account for different teams',
          'A time zone setting for scheduling AWS Lambda functions',
          'An isolated data center within a region with independent power, cooling, and networking',
          'A virtual private network connecting multiple AWS regions'
        ],
        answer: 2,
        explanation: 'An Availability Zone (AZ) is a physically isolated data center within an AWS Region. Each AZ has its own power, cooling, and networking. High availability apps deploy across multiple AZs — if one AZ has an outage, your app continues running in the others.',
        points: 15
      },
      {
        id: 'q-aws-2',
        type: 'mcq',
        question: 'Your EC2 instance needs to read files from S3. What is the CORRECT approach?',
        options: [
          'Hardcode your AWS Access Key and Secret Key inside the Spring Boot application.properties',
          'Attach an IAM Role to the EC2 instance with S3 read permissions',
          'Store credentials in a text file on the EC2 instance and read them at startup',
          'Create a shared AWS root account and share credentials with the EC2 instance'
        ],
        answer: 1,
        explanation: 'IAM Roles are the correct approach. Attach a role with S3 read permissions to the EC2 instance — the AWS SDK automatically uses temporary credentials from the instance metadata service. Never hardcode credentials — they can be exposed in logs, git history, or if the server is compromised.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-aws-1',
        type: 'explain',
        question: 'Why should you NEVER use the AWS root account for daily operations?',
        answer: 'The root account has unlimited, unrevokable access to everything in your AWS account — it can delete all data, incur unlimited charges, and cannot be restricted by IAM policies. Best practice: create an IAM user with only the permissions you need, enable MFA on root, then lock the root credentials away. For services, use IAM Roles instead of users.',
        hint: 'Think about the principle of least privilege and what happens if root credentials are compromised.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-aws-1',
        question: 'Explain the AWS Shared Responsibility Model.',
        level: 'intermediate',
        answer: 'AWS and customers share security responsibilities. AWS is responsible for security OF the cloud: physical hardware, data centers, network infrastructure, hypervisor, managed service software. Customers are responsible for security IN the cloud: their own data (encryption), IAM configurations, network security groups, OS patching (for EC2), application security, and compliance. For example, AWS ensures physical access to data centers is controlled, but you must ensure your S3 buckets aren\'t publicly readable.',
        example: 'AWS secures: physical servers, fiber cables, Xen hypervisor\nYou secure: your data encryption, IAM policies, security groups, app vulnerabilities'
      }
    ],
    xpReward: 40
  },
  {
    id: 'aws-ec2',
    moduleKey: 'aws',
    title: 'EC2 — Running Your Spring Boot App in the Cloud',
    slug: 'ec2',
    difficulty: 'intermediate',
    duration: 16,
    order: 2,
    prerequisites: ['aws-intro'],
    tags: ['ec2', 'virtual-machines', 'ssh', 'security-groups', 'elastic-ip', 'ami', 'key-pair'],
    explanation: 'Amazon EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud. You can launch a Linux instance, SSH into it, deploy your Spring Boot JAR, and serve traffic from it within minutes. EC2 is the foundation of most AWS architectures.',
    beginnerExplanation: 'EC2 is like renting a Linux computer on the internet. You choose the size (1 CPU/1GB RAM up to 192 CPU/1.5TB RAM), pick a pre-built OS image (Ubuntu, Amazon Linux), and it\'s running in 60 seconds. You can SSH into it like a real server, install Java, deploy your app, and it\'s live on the internet. You pay by the hour and can delete it anytime.',
    technicalExplanation: 'EC2 instances are virtual machines running on AWS physical hardware via the Nitro hypervisor. Instance families: t3 (burstable, dev/test), m6g (general purpose, ARM), c6i (compute-optimized), r6i (memory-optimized). AMIs (Amazon Machine Images) are EBS snapshots + metadata defining the OS. Security Groups are stateful virtual firewalls (allow rules only, implicit deny all). Elastic IPs are static public IPv4 addresses that persist across instance stop/start. EBS (Elastic Block Store) volumes persist independently of instance lifecycle.',
    keyPoints: [
      'Instance Type: Defines CPU, RAM, network — t2.micro (1 vCPU, 1GB) is Free Tier eligible',
      'AMI: Amazon Machine Image — the OS template (Ubuntu 24.04, Amazon Linux 2023)',
      'Security Group: Virtual firewall — by default blocks ALL inbound traffic',
      'Key Pair: SSH public/private key for secure server access (no passwords)',
      'Elastic IP: Static public IP address that stays the same after reboots',
      'User Data: Shell script that runs on first boot — automate Java installation',
      'SSH: ssh -i keypair.pem ubuntu@<elastic-ip> to connect to your instance',
      'EBS Volume: Block storage attached to EC2 — your /var/log and app files live here'
    ],
    codeExample: `# ─── Launching EC2 with AWS CLI ───────────────
aws ec2 run-instances \\
  --image-id ami-0c02fb55956c7d316 \\   # Amazon Linux 2023
  --instance-type t2.micro \\
  --key-name my-keypair \\
  --security-group-ids sg-0abc123def456 \\
  --user-data file://setup.sh \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=knowhere-api}]'

# ─── setup.sh (User Data — runs on first boot) ───
#!/bin/bash
yum update -y

# Install Java 21 LTS (Amazon Linux)
yum install -y java-21-amazon-corretto

# Create app directory and user
useradd -m -s /bin/bash appuser
mkdir -p /opt/knowhere

# Download JAR from S3 (requires IAM role with S3 access)
aws s3 cp s3://my-deploy-bucket/app.jar /opt/knowhere/app.jar
chown appuser:appuser /opt/knowhere/app.jar

# Create systemd service for auto-restart
cat > /etc/systemd/system/knowhere.service << 'EOF'
[Unit]
Description=Knowhere Tech Spring Boot API
After=network.target

[Service]
User=appuser
ExecStart=/usr/bin/java -jar /opt/knowhere/app.jar
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl enable knowhere
systemctl start knowhere

# ─── SSH into your instance ───────────────────
# Make key read-only (required by SSH)
chmod 400 my-keypair.pem

# Connect
ssh -i my-keypair.pem ec2-user@<your-elastic-ip>

# View your app logs
journalctl -u knowhere -f`,
    codeLanguage: 'bash',
    codeLines: [
      { code: '--image-id ami-0c02fb55956c7d316', token: 'image-id', explanation: 'AMI ID specifies the OS image. Each region has different AMI IDs for the same OS. Use the EC2 console "AMI catalog" to find the right ID for your region.' },
      { code: '--user-data file://setup.sh', token: 'user-data', explanation: 'User Data runs as root on the first boot. Perfect for automating Java installation, app deployment, and service configuration. Logs available at /var/log/cloud-init-output.log.' },
      { code: 'chmod 400 my-keypair.pem', token: 'chmod 400', explanation: 'SSH requires the private key file to be readable ONLY by the owner. If permissions are too open, SSH refuses to use the key. 400 = owner read-only.' }
    ],
    quiz: [
      {
        id: 'q-aws-3',
        type: 'mcq',
        question: 'Your Spring Boot app is running on EC2 port 8080, but you can\'t access it from your browser. What is the most likely cause?',
        options: [
          'Spring Boot needs to be restarted',
          'The Security Group doesn\'t have an inbound rule allowing port 8080 from your IP',
          'EC2 instances cannot serve HTTP traffic',
          'Port 8080 is reserved by AWS and cannot be used'
        ],
        answer: 1,
        explanation: 'EC2 Security Groups block ALL inbound traffic by default. You must explicitly add an inbound rule: Type=Custom TCP, Port=8080, Source=0.0.0.0/0 (or your specific IP). Without this rule, your app runs fine but network traffic is blocked before it reaches the instance.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-aws-2',
        type: 'explain',
        question: 'What security group rules do you need for a Spring Boot API that must be accessible from the internet and also connect to RDS PostgreSQL?',
        answer: 'Inbound rules for API Security Group:\n- Port 80 (HTTP) from 0.0.0.0/0 — for Nginx\n- Port 443 (HTTPS) from 0.0.0.0/0 — for HTTPS\n- Port 22 (SSH) from YOUR_IP only — for admin access\n\nOutbound rules: Allow all (0.0.0.0/0) — EC2 needs to make outbound calls to RDS, S3, etc.\n\nRDS Security Group inbound: Port 5432 from EC2 Security Group ID (not IP) — only your EC2 can reach the database, not the internet.',
        hint: 'Think about: what needs to come IN, what needs to go OUT, and how to restrict database access.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-aws-2',
        question: 'What is the difference between stopping and terminating an EC2 instance?',
        level: 'beginner',
        answer: 'Stopping an EC2 instance shuts it down — like turning off a computer. The EBS root volume and data are preserved. You are NOT charged for compute while stopped (but still charged for EBS storage). Restarting takes a minute. Terminating an EC2 instance permanently deletes it — the root EBS volume is also deleted by default. You cannot recover a terminated instance. Use Stop for maintenance/cost savings; use Terminate only when completely done with the instance.',
        example: 'Stop = hibernate (data survives, compute billing stops)\nTerminate = delete forever (data gone unless you had snapshots)'
      }
    ],
    xpReward: 60
  },
  {
    id: 'aws-s3',
    moduleKey: 'aws',
    title: 'S3 — Object Storage for Files, Images & Static Sites',
    slug: 's3',
    difficulty: 'beginner',
    duration: 12,
    order: 3,
    prerequisites: ['aws-intro'],
    tags: ['s3', 'object-storage', 'buckets', 'static-hosting', 'presigned-url', 'cloudfront', 'cdn'],
    explanation: 'Amazon S3 (Simple Storage Service) is infinitely scalable object storage. Store any file up to 5TB — profile images, documents, application JARs, database backups, static website files. S3 is 99.999999999% (11 nines) durable and integrates with virtually every AWS service.',
    beginnerExplanation: 'S3 is like a limitless filing cabinet in the cloud where you can store any type of file. Each file lives in a "bucket" (like a folder) with a unique name, and you access files via a URL. Perfect for storing user profile photos, uploaded documents, CSV exports, or even hosting your entire React website. You only pay for the storage you actually use — no upfront commitment.',
    technicalExplanation: 'S3 is a distributed key-value object store. Keys are arbitrary strings (paths like "users/123/avatar.jpg"). Objects can be 0 bytes to 5TB. Storage classes: Standard (frequent access), Standard-IA (infrequent access), Glacier (archival). Durability: objects are replicated across ≥3 AZs. Versioning enables recovery from accidental deletes. Server-Side Encryption (SSE-S3, SSE-KMS) protects data at rest. Pre-signed URLs grant temporary access to private objects without exposing AWS credentials.',
    keyPoints: [
      'Bucket: Container for objects — name must be globally unique across ALL AWS accounts',
      'Object: Any file stored in S3, identified by key (path-like string)',
      'Bucket Policies: JSON rules controlling who can access objects',
      'Block Public Access: On by default — prevents accidental public exposure of sensitive data',
      'Static Website Hosting: S3 can serve HTML/CSS/JS files directly — no server needed',
      'Pre-signed URL: Temporary URL (expires in minutes/hours) for private file access',
      'S3 + CloudFront: CDN distribution puts your files on edge servers globally for low latency',
      'Multipart Upload: Required for files over 100MB — uploads in parallel chunks'
    ],
    codeExample: `// Spring Boot — Upload files to S3 with AWS SDK v2
@Service
public class S3FileService {

    private final S3Client s3Client;
    private final String bucketName = "knowhere-uploads";

    // Upload a user's profile photo
    public String uploadFile(MultipartFile file, String userId) throws IOException {
        String key = "profiles/" + userId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .contentType(file.getContentType())
            .build();

        s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));

        return key;  // Store this key in your database
    }

    // Generate a pre-signed URL for temporary private access (expires in 1 hour)
    public String generatePresignedUrl(String key) {
        S3Presigner presigner = S3Presigner.create();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
            .signatureDuration(Duration.ofHours(1))   // URL expires in 1 hour
            .getObjectRequest(GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build())
            .build();

        return presigner.presignGetObject(presignRequest).url().toString();
    }

    // Delete a file
    public void deleteFile(String key) {
        s3Client.deleteObject(DeleteObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build());
    }
}

# AWS CLI — common S3 operations
aws s3 mb s3://my-unique-bucket-name --region ap-south-1  # Create bucket
aws s3 cp app.jar s3://my-deploy-bucket/releases/app-v2.jar  # Upload file
aws s3 sync dist/ s3://my-website-bucket/ --delete          # Sync React build
aws s3 ls s3://my-bucket --recursive --human-readable        # List all files`,
    codeLanguage: 'java',
    codeLines: [
      { code: 'String key = "profiles/" + userId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();', token: 'key', explanation: 'S3 keys work like paths but are just strings. Using UUID prevents filename collisions when two users upload files with the same name. Store this key in your DB to retrieve the file later.' },
      { code: '.signatureDuration(Duration.ofHours(1))', token: 'signatureDuration', explanation: 'Pre-signed URLs embed time-limited authentication — after 1 hour, the URL is invalid. Use this for private files that need temporary access (profile photos, invoice PDFs) without making the bucket public.' }
    ],
    quiz: [
      {
        id: 'q-aws-4',
        type: 'mcq',
        question: 'Which approach is CORRECT for giving users temporary access to a private S3 file?',
        options: [
          'Make the S3 bucket publicly accessible',
          'Email the user your AWS access key and secret',
          'Generate a pre-signed URL with an expiration time and send it to the user',
          'Copy the file to a public EC2 server and share that URL'
        ],
        answer: 2,
        explanation: 'Pre-signed URLs are the secure approach. They grant time-limited access to a specific private object without exposing AWS credentials or making the bucket public. After the expiration time, the URL becomes invalid. Generate a new pre-signed URL each time the user needs access.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-aws-3',
        type: 'predict-output',
        question: 'You upload a file to S3 with key "reports/2025/annual.pdf". How do you retrieve it later?',
        answer: 'Store the key string "reports/2025/annual.pdf" in your database alongside the record. To retrieve: call s3Client.getObject() with bucketName + key, or generate a pre-signed URL using that key. The bucket name + key uniquely identifies any S3 object.',
        hint: 'The "key" in S3 is like a file path — store it in your database when uploading.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-aws-3',
        question: 'How would you host a React application\'s static build on AWS?',
        level: 'intermediate',
        answer: '1. Run npm run build → creates /dist folder with index.html, JS/CSS bundles\n2. Create S3 bucket → enable "Static website hosting" → set index.html as index document\n3. Set bucket policy to allow public GetObject (or use CloudFront with OAC for private bucket)\n4. Upload: aws s3 sync dist/ s3://my-website/ --delete\n5. (Optional but recommended) Create CloudFront distribution pointing to S3: provides HTTPS, global CDN caching, and custom domain via ACM certificate\n6. Add a _redirects file or CloudFront custom error page returning index.html for React router SPA navigation.',
        example: 'aws s3 sync dist/ s3://my-react-app/ --delete\n→ CloudFront URL: https://d1234.cloudfront.net\n→ Custom domain: https://app.mycompany.com'
      }
    ],
    xpReward: 50
  },
  {
    id: 'aws-rds',
    moduleKey: 'aws',
    title: 'RDS — Managed Relational Databases on AWS',
    slug: 'rds',
    difficulty: 'intermediate',
    duration: 13,
    order: 4,
    prerequisites: ['aws-ec2'],
    tags: ['rds', 'postgresql', 'mysql', 'managed-database', 'connection-pooling', 'parameter-groups', 'backups'],
    explanation: 'Amazon RDS (Relational Database Service) runs managed PostgreSQL, MySQL, MariaDB, Oracle, and SQL Server databases. AWS handles backups, patches, failover, and replication — you focus on your application. RDS integrates perfectly with Spring Boot and Spring Data JPA.',
    beginnerExplanation: 'Running your own PostgreSQL server means YOU handle everything: installing it, configuring it, applying security patches, setting up backups, dealing with hardware failures. RDS does all that for you. It\'s like having a professional DBA (database administrator) managing your database 24/7 as a service. You just connect to it with a JDBC URL, exactly like a local database.',
    technicalExplanation: 'RDS runs database engines on managed EC2 instances. Multi-AZ deployment: RDS synchronously replicates to a standby in another AZ — automatic failover in 1-2 minutes if primary fails. Read Replicas: async replication for horizontal read scaling. Parameter Groups: configure DB settings (max_connections, shared_buffers). Option Groups: add DB features (Oracle encryption, MySQL memcached). Automated backups: daily snapshots + transaction logs enable point-in-time recovery. DB Subnet Groups: specify VPC subnets where RDS can run.',
    keyPoints: [
      'Managed: AWS handles patching, backups, failover — no DB administration needed',
      'Multi-AZ: Synchronous standby replica for automatic failover (production requirement)',
      'Read Replica: Async copy for read-heavy workloads — reduce primary DB load',
      'DB Subnet Group: Deploy RDS in private subnets — never expose to public internet',
      'Parameter Group: Configure DB engine settings (max_connections, work_mem)',
      'Automated Backups: Daily snapshots, 7-35 day retention, point-in-time restore',
      'Connection Pooling: Use HikariCP (Spring Boot default) to efficiently reuse connections',
      'Secrets Manager: Store DB credentials securely — Spring Boot can auto-rotate them'
    ],
    codeExample: `# Spring Boot application.properties for RDS PostgreSQL
spring.datasource.url=jdbc:postgresql://\${DB_HOST}:5432/\${DB_NAME}
spring.datasource.username=\${DB_USERNAME}
spring.datasource.password=\${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# HikariCP Connection Pool Configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=validate    # In prod: validate (never create/update)
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=false                 # Disable SQL logging in production

# Read Replica for read-heavy operations (optional)
spring.datasource.secondary.url=jdbc:postgresql://\${DB_READONLY_HOST}:5432/\${DB_NAME}

# AWS CLI — Create RDS PostgreSQL instance
aws rds create-db-instance \\
  --db-instance-identifier knowhere-db \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --engine-version 16.2 \\
  --master-username admin \\
  --master-user-password "\${DB_PASSWORD}" \\
  --allocated-storage 20 \\
  --storage-type gp3 \\
  --multi-az \\              # Enable Multi-AZ for production
  --no-publicly-accessible \\ # Keep in private subnet!
  --db-subnet-group-name my-db-subnet-group \\
  --vpc-security-group-ids sg-0rds123`,
    codeLanguage: 'properties',
    codeLines: [
      { code: 'spring.datasource.url=jdbc:postgresql://${DB_HOST}:5432/${DB_NAME}', token: '${DB_HOST}', explanation: 'Use environment variables, not hardcoded values. DB_HOST is the RDS endpoint from AWS console (like knowhere-db.abc123.us-east-1.rds.amazonaws.com).' },
      { code: 'spring.datasource.hikari.maximum-pool-size=10', token: 'maximum-pool-size', explanation: 'HikariCP maintains a pool of reusable DB connections. max-pool-size=10 means 10 connections are reused for all app threads. Opening a new connection takes ~100ms; pooling eliminates this latency.' },
      { code: 'spring.jpa.hibernate.ddl-auto=validate', token: 'validate', explanation: 'In production: NEVER use create or update (destructive). Use validate (verifies DB matches entities, crashes if not) or none. Use Flyway/Liquibase for schema migrations in production.' }
    ],
    quiz: [
      {
        id: 'q-aws-5',
        type: 'mcq',
        question: 'What does RDS Multi-AZ deployment provide?',
        options: [
          'Multiple databases with different schemas for different regions',
          'Automatic failover to a standby replica in another AZ if the primary fails',
          'Multiple read replicas distributed across availability zones',
          'Multi-region replication for global database access'
        ],
        answer: 1,
        explanation: 'Multi-AZ creates a synchronous standby replica in a different AZ. If the primary instance fails (hardware failure, maintenance), RDS automatically promotes the standby and updates the DNS endpoint — typically in 1-2 minutes with no data loss. Your JDBC URL stays the same; DNS points to the new primary.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-aws-4',
        type: 'explain',
        question: 'Should you set spring.jpa.hibernate.ddl-auto=create-drop in production? Why or why not?',
        answer: 'Absolutely NOT. create-drop drops ALL tables and recreates them every time the application starts — you lose ALL data. This is useful only in development. In production, use "validate" (checks entities match schema, fails if not) or "none" (no schema management). Use a migration tool like Flyway or Liquibase to manage schema changes safely.',
        hint: 'What does "drop" mean for your production database data?'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-aws-4',
        question: 'Explain connection pooling and why it is critical for production Spring Boot + RDS applications.',
        level: 'intermediate',
        answer: 'Each database connection requires TCP handshake + TLS + PostgreSQL authentication — taking ~100-300ms. Without pooling, every HTTP request creates and destroys a DB connection, adding latency and overwhelming the DB (RDS db.t3.micro supports ~85 max connections). HikariCP (Spring Boot default) maintains a pool of pre-established connections. Threads borrow a connection, execute queries, return it. With pool-size=10, 10 threads can simultaneously query the DB, while others wait. Configure maximum-pool-size to match your expected concurrent users and RDS instance connection limit.',
        example: 'Without pool: 100 requests × 200ms connection overhead = 20 seconds of extra latency\nWith HikariCP pool: connections reused → near-zero overhead'
      }
    ],
    xpReward: 60
  },
  {
    id: 'aws-ecs',
    moduleKey: 'aws',
    title: 'ECS Fargate — Deploying Docker Containers on AWS',
    slug: 'ecs',
    difficulty: 'advanced',
    duration: 18,
    order: 5,
    prerequisites: ['aws-ec2', 'aws-rds'],
    tags: ['ecs', 'fargate', 'containers', 'ecr', 'task-definition', 'service', 'load-balancer', 'auto-scaling'],
    explanation: 'Amazon ECS (Elastic Container Service) with Fargate is the modern way to run Docker containers on AWS without managing EC2 instances. You define your container\'s CPU/memory requirements, push your image to ECR, and AWS runs and scales it automatically — this is how production microservices are deployed.',
    beginnerExplanation: 'EC2 is like renting a full server — you manage the OS, security patches, and capacity. ECS Fargate is like paying for just the takeout meal, not the whole restaurant. You just say "run this Docker container with 1 vCPU and 2GB RAM" and AWS handles the rest — no server management, no capacity planning. Your Spring Boot container scales automatically when traffic increases and scales down to save cost when it\'s quiet.',
    technicalExplanation: 'ECS architecture: Cluster (logical grouping) → Service (maintains desired number of Tasks) → Task (group of containers, like a pod) → Container (your Docker image). Task Definition: JSON blueprint specifying image URI, CPU/memory, environment variables, port mappings, log configuration. Fargate: serverless compute for containers — no EC2 to manage. ECR (Elastic Container Registry): private Docker registry in AWS. Application Load Balancer (ALB) distributes traffic across ECS Tasks. Auto Scaling based on CPU%, memory, or custom CloudWatch metrics.',
    keyPoints: [
      'ECR: Elastic Container Registry — private Docker image registry in your AWS account',
      'Task Definition: Blueprint defining container image, CPU/memory, ports, env vars',
      'Fargate: Serverless container execution — no EC2 instances to manage',
      'ECS Service: Ensures desired count of Tasks are always running, restarts on failure',
      'ALB: Application Load Balancer distributes HTTP/HTTPS traffic across running Tasks',
      'Service Auto Scaling: Scale Tasks in/out based on CPU%, memory, or request count',
      'CloudWatch Logs: Container stdout/stderr captured automatically with awslogs driver',
      'Service Discovery: Containers find each other via Route 53 or Cloud Map DNS'
    ],
    codeExample: `# ─── 1. Push image to ECR ─────────────────────
# Authenticate Docker to ECR
aws ecr get-login-password --region ap-south-1 | \\
  docker login --username AWS --password-stdin \\
  123456789.dkr.ecr.ap-south-1.amazonaws.com

# Build and tag image
docker build -t knowhere-api .
docker tag knowhere-api:latest \\
  123456789.dkr.ecr.ap-south-1.amazonaws.com/knowhere-api:latest

# Push to ECR
docker push 123456789.dkr.ecr.ap-south-1.amazonaws.com/knowhere-api:latest

# ─── 2. Task Definition (JSON) ────────────────
# {
#   "family": "knowhere-api",
#   "networkMode": "awsvpc",
#   "requiresCompatibilities": ["FARGATE"],
#   "cpu": "512",       // 0.5 vCPU
#   "memory": "1024",   // 1 GB RAM
#   "containerDefinitions": [{
#     "name": "api",
#     "image": "123456789.dkr.ecr.ap-south-1.amazonaws.com/knowhere-api:latest",
#     "portMappings": [{"containerPort": 8080, "protocol": "tcp"}],
#     "environment": [
#       {"name": "SPRING_PROFILES_ACTIVE", "value": "prod"},
#       {"name": "DB_HOST", "value": "knowhere-db.abc.rds.amazonaws.com"}
#     ],
#     "secrets": [{
#       "name": "DB_PASSWORD",
#       "valueFrom": "arn:aws:secretsmanager:ap-south-1:123456789:secret:db-password"
#     }],
#     "logConfiguration": {
#       "logDriver": "awslogs",
#       "options": {
#         "awslogs-group": "/ecs/knowhere-api",
#         "awslogs-region": "ap-south-1",
#         "awslogs-stream-prefix": "ecs"
#       }
#     }
#   }]
# }

# ─── 3. Create ECS Service ────────────────────
aws ecs create-service \\
  --cluster knowhere-cluster \\
  --service-name knowhere-api-service \\
  --task-definition knowhere-api:1 \\
  --desired-count 2 \\                # Run 2 containers for HA
  --launch-type FARGATE \\
  --network-configuration "awsvpcConfiguration={
    subnets=[subnet-abc,subnet-def],
    securityGroups=[sg-ecs123],
    assignPublicIp=DISABLED
  }" \\
  --load-balancers "targetGroupArn=arn:...,containerName=api,containerPort=8080"`,
    codeLanguage: 'bash',
    codeLines: [
      { code: '"cpu": "512", "memory": "1024"', token: 'cpu/memory', explanation: 'Fargate uses vCPU units (256=0.25 vCPU, 512=0.5 vCPU, 1024=1 vCPU) and MB. You pay per second based on reserved CPU and memory — choose minimum that keeps your app healthy.' },
      { code: '"valueFrom": "arn:aws:secretsmanager:..."', token: 'secrets', explanation: 'Never put passwords in environment variables directly — they appear in CloudTrail logs. Use Secrets Manager or SSM Parameter Store ARNs — ECS retrieves the secret value at runtime.' },
      { code: '--desired-count 2', token: 'desired-count', explanation: 'ECS maintains exactly this many running Tasks. If one crashes, ECS automatically launches a replacement. For production, always run at least 2 Tasks across different AZs.' }
    ],
    quiz: [
      {
        id: 'q-aws-6',
        type: 'mcq',
        question: 'What is the main advantage of ECS Fargate over running containers on EC2?',
        options: [
          'Fargate containers are faster because they don\'t use virtualization',
          'Fargate is always cheaper than EC2 for any workload',
          'Fargate eliminates server management — no OS patching, capacity planning, or scaling EC2 instances',
          'Fargate supports more Docker features than EC2'
        ],
        answer: 2,
        explanation: 'Fargate is serverless containers — AWS manages the underlying EC2 infrastructure. You only define CPU/memory requirements for your Task, and AWS handles provisioning, patching, and scaling the servers. This eliminates operational overhead: no AMI updates, no node capacity management, no draining instances before updates.',
        points: 20
      }
    ],
    practice: [
      {
        id: 'p-aws-5',
        type: 'explain',
        question: 'A new version of your Spring Boot Docker image is pushed to ECR. How do you deploy it to ECS with zero downtime?',
        answer: '1. Update the Task Definition with the new image tag (or use :latest with force-new-deployment)\n2. Update the ECS Service: aws ecs update-service --cluster <cluster> --service <service> --force-new-deployment\n3. ECS performs a rolling update: launches new Tasks with the new image, waits for them to pass health checks, then terminates old Tasks\n4. ALB shifts traffic gradually to new Tasks\nWith --minimum-healthy-percent=100 and --maximum-percent=200, you always have 2 Tasks running during deployment — zero downtime.',
        hint: 'Think about rolling updates, health checks, and how ALB routes traffic.'
      }
    ],
    interviewQuestions: [
      {
        id: 'iq-aws-5',
        question: 'Explain the ECS deployment architecture for a production Spring Boot microservice.',
        level: 'advanced',
        answer: 'Production ECS architecture:\n• ECR: Docker image registry stores versioned images\n• VPC: Private subnets for ECS Tasks and RDS; public subnets for ALB only\n• ALB (public): Routes HTTPS (port 443) traffic to ECS Target Group; SSL terminated at ALB\n• ECS Service: Maintains 2+ Fargate Tasks across AZs; rolling updates with health checks\n• Task Definition: Container spec with ECR image, CPU/RAM, env vars from Secrets Manager, CloudWatch log driver\n• Auto Scaling: Scale Tasks when CPU >70% for 3 consecutive minutes; scale in when <30%\n• RDS Multi-AZ: Private subnet, only ECS security group has inbound access\n• CloudWatch: Container logs, metrics, alarms; SNS notifications on failures',
        example: 'Internet → Route53 → ALB (HTTPS) → ECS Tasks (private subnet) → RDS (private subnet)'
      }
    ],
    xpReward: 80
  }
];
