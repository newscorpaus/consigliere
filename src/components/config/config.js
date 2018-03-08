module.exports = {
  "TrustedAdvisor": {
    "Checks": [
      {
        "Name": "Security Groups - Specific Ports Unrestricted",
        "DefaultText": "%X of %Y security group rules allow unrestricted access to a specific port.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          3,
          5
        ]
      },
      {
        "Name": "Security Groups - Unrestricted Access",
        "DefaultText": "%X of %Y security group rules have a source IP address with a /0 suffix.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          3,
          4,
          6
        ]
      },
      {
        "Name": "ELB Listener Security",
        "DefaultText": "%X of %Y load balancers have listeners that do not use recommended security configurations.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          4
        ],
        "OverrideTableHeaders" : {
          "HeaderColumns" : [
            "Region",
            "Load Balancer Name",
            "Load Balancer Port",
            "Reason"
          ]
        }
      },
      {
        "Name": "ELB Security Groups",
        "DefaultText": "%X of %Y load balancers are associated with security groups that are either missing or incorrectly configured.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          3,
          4
        ],
        "OverrideTableHeaders" : {
          "HeaderColumns" : [
            "Region",
            "Load Balancer Name",
            "Security Group IDs",
            "Reason"
          ]
        }
      },
      {
        "Name": "Amazon RDS Security Group Access Risk",
        "DefaultText": "%X of %Y Amazon RDS security group rules create potential security vulnerabilities by granting global access.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name": "Amazon Route 53 MX Resource Record Sets and Sender Policy Framework",
        "DefaultText": "%X of %Y MX resource record sets do not have a corresponding SPF resource record set.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2
        ]
      },
      {
        "Name": "Amazon S3 Bucket Permissions",
        "DefaultText": "%X of %Y buckets have permission properties that grant global access.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns":[
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name": "AWS CloudTrail Logging",
        "DefaultText": "%X of %Y regions are not logging activity by using CloudTrail.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name": "CloudFront Custom SSL Certificates in the IAM Certificate Store",
        "DefaultText": "%X of %Y custom SSL certificates are expired, will soon expire, or are incorrectly configured.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name": "IAM Password Policy",
        "DefaultText": "Password policy is enabled, and all content requirements are enabled",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name": "IAM Use",
        "DefaultText": "At least one IAM user, group, or role has been created for this account",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "MFA on Root Account",
        "DefaultText": "MFA is enabled on the root account",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "CloudFront SSL Certificate on the Origin Server",
        "DefaultText": "%X of %Y certificates on your origin are expired, will soon expire, use outdated encryption, or could not be examined.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "IAM Access Key Rotation",
        "DefaultText" : "%X of %Y active access keys have not been rotated in the last 90 days.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "Amazon EBS Snapshots",
        "DefaultText": "%X of %Y volumes do not have a recent snapshot.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8
        ]
      },
      {
        "Name" : "Amazon EC2 Availability Zone Balance",
        "DefaultText": "%X regions have an imbalanced instance distribution across Availability Zones.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          7
        ]
      },
      {
        "Name" : "Load Balancer Optimization ",
        "DefaultText": "%X of %Y load balancers are configured in a suboptimal way.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          9
        ]
      },
      {
        "Name" : "VPN Tunnel Redundancy",
        "DefaultText": "%X of %Y VPNs have less than 2 active tunnels.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          7
        ]
      },
      {
        "Name" : "Auto Scaling Group Resources",
        "DefaultText": "%X of %Y Auto Scaling groups are configured with unavailable resources.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "Amazon RDS Backups",
        "DefaultText": "%X of %Y DB instances do not have automated backups enabled.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "Amazon RDS Multi-AZ",
        "DefaultText": "%X of %Y DB instances are not Multi-AZ enabled.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "Auto Scaling Group Health Check",
        "DefaultText": "%X of %Y Auto Scaling groups have a suboptimal health check configuration.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "Amazon S3 Bucket Logging",
        "DefaultText": "%X of %Y buckets do not have logging enabled or are not configured properly.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          7
        ]
      },
      {
        "Name" : "Amazon Route 53 Name Server Delegations",
        "DefaultText": "%X of %Y hosted zones do not have all four name server delegations configured.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2
        ]
      },
      {
        "Name" : "Amazon Route 53 High TTL Resource Record Sets",
        "DefaultText": "%X of %Y resource record sets have TTL values that are too large.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "Name" : "Amazon Route 53 Failover Resource Record Sets",
        "DefaultText": "%X of %Y failover resource record sets are not configured correctly.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "Amazon Route 53 Deleted Health Checks",
        "DefaultText": "%X of %Y resource record sets are associated with health checks that have been deleted.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "ELB Cross-Zone Load Balancing",
        "DefaultText": "%X of %Y load balancers do not have cross-zone load balancing enabled.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          3
        ],
        "OverrideTableHeaders" : {
          "HeaderColumns" : [
            "Region",
            "Load Balancer Name",
            "Reason"
          ]
        }
      },
      {
        "Name" : "ELB Connection Draining",
        "DefaultText": "%X of %Y load balancers do not have connection draining enabled.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          3
        ],
        "OverrideTableHeaders" : {
          "HeaderColumns" : [
            "Region",
            "Load Balancer Name",
            "Reason"
          ]
        }
      },
      {
        "Name": "Amazon S3 Bucket Versioning",
        "DefaultText": "%X of %Y buckets do not have versioning enabled, or versioning is suspended. ",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns":[
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "High Utilization Amazon EC2 Instances",
        "DefaultText": "%X of %Y Amazon EC2 instances have high average daily utilization.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          18,
          19
        ]
      },
      {
        "Name" : "Service Limits",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "Amazon EBS Provisioned IOPS (SSD) Volume Attachment Configuration",
        "DefaultText": "%X of %Y EBS Provisioned IOPS volumes are attached to an EC2 instance that is not EBS-optimized.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "Name" : "Large Number of Rules in an EC2 Security Group",
        "DefaultText": "%X of %Y security groups have a large number of rules.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ]
      },
      {
        "Name" : "Large Number of EC2 Security Group Rules Applied to an Instance",
        "DefaultText": "%X of %Y EC2 instances have a large number of security group rules.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "Name" : "Amazon Route 53 Alias Resource Record Sets",
        "DefaultText": "%X of %Y resource record sets can be changed to alias resource record sets.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "Name" : "Overutilized Amazon EBS Magnetic Volumes",
        "DefaultText": "%X of %Y standard Amazon EBS volumes are potentially overutilized and might benefit from a more efficient configuration.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          17,
          18
        ]
      },
      {
        "Name" : "CloudFront Content Delivery Optimization",
        "DefaultText": "%X of %Y Amazon S3 buckets might benefit from the use of Amazon CloudFront.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "CloudFront Header Forwarding and Cache Hit Ratio",
        "DefaultText": "%X of %Y cache behaviors are forwarding headers, such as Date or User-Agent, that significantly reduce the cache hit ratio.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "Amazon EC2 to EBS Throughput Optimization",
        "DefaultText": "%X of %Y EBS-optimized EC2 instances had EBS volume usage that exceeded 95% of the instance maximum throughput for more than half of the preceding day.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ],
        "OverrideTableHeaders" : {
          "HeaderColumns" : [
            "Region",
            "Instance ID",
            "Instance Type",
            "Time Near Maximum"
          ]
        }
      },
      {
        "Name" : "CloudFront Alternate Domain Names",
        "DefaultText": "%X of %Y distributions with alternate domain names might not be configured to route DNS queries to the CloudFront distribution.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2
        ]
      },
      {
        "Name" : "Low Utilization Amazon EC2 Instances",
        "DefaultText": "%X of %Y Amazon EC2 instances have low average daily utilization.",
        "CostOptimizingText": "Monthly savings of up to $%X might be available by minimizing underutilized instances.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          19,
          20,
          21
        ]
      },
      {
        "Name" : "Idle Load Balancers",
        "DefaultText": "%X of %Y load balancers appear to be idle.",
        "CostOptimizingText": "Monthly savings of up to $%X are available by minimizing unused load balancers.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "Underutilized Amazon EBS Volumes",
        "DefaultText": "%X of %Y EBS volumes appear to be underutilized.",
        "CostOptimizingText": "Monthly savings of up to $%X are available by minimizing underused EBS volumes.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ]
      },
      {
        "Name" : "Unassociated Elastic IP Addresses",
        "DefaultText": "%X of %Y Elastic IP addresses are not associated with a running instance.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1
        ]
      },
      {
        "Name" : "Amazon RDS Idle DB Instances",
        "DefaultText": "%X of %Y DB instances appear to be Idle.",
        "CostOptimizingText": "Monthly savings of up to $%X are available by minimizing idle DB Instances.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "Name" : "Amazon Route 53 Latency Resource Record Sets",
        "DefaultText": "%X of %Y domain names have only one latency resource record set.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3
        ]
      },
      {
        "Name" : "Amazon EC2 Reserved Instances Optimization",
        "CostOptimizingText": "Monthly savings of up to $%X (%Y%) might be available with optimal Reserved Instance use.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ]
      },
      {
        "Name" : "Auto Scaling Groups",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "Auto Scaling Launch Configurations",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "CloudFormation Stacks",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EBS Active Snapshots",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EBS Active Volumes",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EBS General Purpose SSD Volume Storage",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EBS Magnetic (standard) Volume Storage",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EBS Provisioned IOPS (SSD) Volume Aggregate IOPS",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EBS Provisioned IOPS SSD (io1) Volume Storage",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EC2 Elastic IP Addresses",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EC2 On-Demand Instances",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "EC2 Reserved Instance Leases",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "ELB Active Load Balancers",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "IAM Group",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "IAM Instance Profiles",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "IAM Policies",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "IAM Roles",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "IAM Server Certificate",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "IAM Users",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "Kinesis Shards per Region",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Cluster Parameter Groups",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Cluster Roles",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Clusters",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS DB Instances",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS DB Parameter Groups",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS DB Security Groups",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS DB Snapshots Per User",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Event Subscriptions",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Max Auths per Security Group",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Option Groups",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Read Replicas per Master",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Reserved Instances",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Subnet Groups",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Subnets per Subnet Group",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "RDS Total Storage Quota",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "SES Daily Sending Quota",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "VPC Elastic IP Address",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "VPC Internet Gateways",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name" : "VPC Network Interfaces",
        "DefaultText": "%X of %Y items have usage that is more than 80% of the service limit.",
        "SuppressionText" : "%X items have been excluded",
        "DefaultDisplayColumns" : [
          0,
          1,
          2,
          3,
          4
        ]
      }
    ]
  }
};
