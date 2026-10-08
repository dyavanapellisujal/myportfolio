import type { Link } from "@/lib/types";

// "How I think" — one entry per engineering domain. `approach` lines are
// working principles; every `evidence` link points at something on this site
// or on GitHub/Medium that backs them up.

export type Domain = {
  id: string;
  title: string;
  approach: string[];
  concepts: string[];
  /** Optional grouped concepts, rendered instead of the flat list. */
  conceptGroups?: { name: string; items: string[] }[];
  tech: string[];
  evidence: Link[];
};

export const domains: Domain[] = [
  {
    id: "kubernetes",
    title: "Kubernetes",
    approach: [
      "Before writing a manifest, work out what has to exist before a pod can schedule, and what happens when the component that adds capacity has none.",
      "Package every service as its own unit of sync and rollback; one bad change shouldn't move unrelated services.",
      "Pick the autoscaling signal from the workload. Web traffic scales on CPU or requests, queue workers on backlog.",
    ],
    concepts: [
      "workload migration",
      "GitOps (ApplicationSets, App-of-Apps)",
      "Helm packaging conventions",
      "KEDA ScaledJob / ScaledObject",
      "Karpenter node provisioning",
      "taints, tolerations, dedicated node groups",
      "PodDisruptionBudgets & migration hooks",
      "EKS Pod Identity",
    ],
    tech: ["EKS", "GKE", "Helm", "ArgoCD", "KEDA", "Karpenter", "kind"],
    evidence: [
      { label: "Elastic Beanstalk → EKS migration · HeyMarvin", href: "/experience/" },
      { label: "Multi-cluster EKS platform", href: "/projects/multi-cluster-eks-gitops/" },
      { label: "KEDA scale-to-zero workers", href: "/projects/keda-scale-to-zero-workers/" },
      { label: "Self-hosted runners on ARC", href: "/projects/self-hosted-github-runners-caching/" },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    approach: [
      "Draw the packet path first: subnet, route table, NACL, security group, target. Most connectivity problems sit at one of those hops.",
      "Choose the narrowest connectivity primitive that works: an endpoint or PrivateLink for one service, peering only when you need network-level reach.",
      "Use subnet-level controls (NACLs) for fast containment and instance-level controls (security groups) for normal access.",
    ],
    concepts: [
      "VPC design & subnetting",
      "route tables, IGW, NAT",
      "VPC peering (non-transitive)",
      "gateway vs interface endpoints",
      "Security Groups vs NACLs",
      "load balancing (ALB)",
      "DNS",
      "L2/L3 container networking",
      "segmented lab networks",
    ],
    tech: ["AWS VPC", "ALB", "Route tables", "pfSense", "Suricata", "Docker networking", "iptables"],
    evidence: [
      { label: "Cross-account VPC peering (article)", href: "/writing/#networking" },
      { label: "S3 via gateway endpoint (article)", href: "/writing/#networking" },
      { label: "Docker MacVLAN & IPVLAN (article)", href: "/writing/#networking" },
      { label: "SOC home lab network design", href: "/writing/#detection-soc" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Architecture",
    approach: [
      "Prefer managed, event-driven building blocks and pay for compute only while there is work.",
      "Use managed Kubernetes (EKS, GKE) as the platform layer for services and workers: provisioned with Terraform, delivered through GitOps, scaled on the signal that matches the workload.",
      "Treat cost as an architecture property: right-size compute, give storage a lifecycle, delete what nothing uses.",
      "Plan disaster recovery up front: decide failover and recovery paths before the outage.",
    ],
    concepts: ["managed Kubernetes", "managed containers (ECS, App Runner)", "serverless & event-driven", "data/ETL pipelines", "cost optimization", "disaster recovery", "multi-region / multi-cluster", "blue-green deployments"],
    tech: ["AWS", "GCP", "EKS", "GKE", "ECS", "App Runner", "Elastic Beanstalk", "Karpenter", "Lambda", "EventBridge", "SQS", "SNS", "Glue (Spark)", "Athena", "S3"],
    evidence: [
      { label: "56% AWS cost reduction · Fixerra", href: "/experience/" },
      { label: "Elastic Beanstalk → EKS migration · HeyMarvin", href: "/experience/" },
      { label: "ECS & App Runner, cloud and security operations · Fixerra", href: "/experience/" },
      { label: "Multi-cluster EKS platform", href: "/projects/multi-cluster-eks-gitops/" },
      { label: "Serverless CSPM", href: "/projects/serverless-cspm/" },
      { label: "Automated incident response", href: "/projects/aws-automated-incident-response/" },
    ],
  },
  {
    id: "iac",
    title: "Infrastructure as Code & Automation",
    approach: [
      "One codebase, many environments: differences live in variables, never in copied code.",
      "Hide the dangerous ceremony (backend + var-file pairing) behind a wrapper so it can't be done wrong by hand.",
      "Make a lab reproducible with one command (make up / make lab) so anyone can verify it.",
    ],
    concepts: ["Terraform modules", "per-environment tfvars", "isolated remote state", "reusable Helm templates", "CI/CD workflows", "scripted operations"],
    tech: ["Terraform", "CloudFormation", "GitHub Actions", "Helm", "Bash", "Python (Boto3)", "Make"],
    evidence: [
      { label: "Reusable Helm templates + GitHub Actions · HeyMarvin", href: "/experience/" },
      { label: "EKS Terraform layout", href: "/projects/multi-cluster-eks-gitops/" },
    ],
  },
  {
    id: "linux",
    title: "Linux",
    approach: [
      "Debug from the bottom of the stack up: process and service state, then resources (CPU, memory, disk, IO), then the network, then the application.",
      "Read what the system already says (journalctl, dmesg, /proc, lsof, strace) before guessing.",
      "A container is a Linux process. Namespaces, cgroups and overlayfs explain most container behaviour, and the same routes and firewall rules apply to it.",
      "Harden by default: least-privilege users and permissions, key-based SSH, and only the services and ports a host actually needs.",
    ],
    concepts: [],
    conceptGroups: [
      { name: "processes & services", items: ["processes & signals", "systemd units", "cron", "package management (apt)"] },
      { name: "debugging", items: ["CPU / memory / disk / IO", "OOM kills", "journalctl / dmesg / /var/log", "strace", "lsof", "/proc", "perf"] },
      {
        name: "networking",
        items: ["interfaces & routing (ip, ss)", "iptables / nftables", "NAT & conntrack", "DNS (dig, nslookup)", "curl / nc / traceroute / mtr", "tcpdump & Wireshark", "Docker networking (bridge, MacVLAN, IPVLAN)"],
      },
      { name: "container internals", items: ["namespaces", "cgroups", "overlayfs"] },
      { name: "administration & hardening", items: ["users, groups & permissions", "sudo & ACLs", "filesystems, mounts & LVM", "SSH hardening", "service minimization"] },
      { name: "scripting", items: ["Bash", "grep / sed / awk"] },
    ],
    tech: ["Ubuntu", "Kali Linux", "Bash", "systemd", "iptables / nftables", "tcpdump", "Wireshark", "Docker"],
    evidence: [
      { label: "Docker MacVLAN & IPVLAN networking (article)", href: "/writing/#networking" },
      { label: "SOC home lab: segmented networks, Suricata, Splunk on Ubuntu", href: "/writing/#detection-soc" },
      { label: "Linux & network hardening (resume)", href: "/resume/#skills" },
    ],
  },
  {
    id: "security",
    title: "Security (DevSecOps)",
    approach: [
      "Express controls as code (OPA policies, IAM JSON in Git) so they can be reviewed in a diff.",
      "Automate containment for high-confidence signals; keep a human in the loop for destructive actions.",
      "Least privilege per workload, not per node.",
    ],
    concepts: ["policy-as-code", "automated remediation", "IAM least privilege", "cloud security posture", "detection engineering", "governance & audit (ISO)", "vendor risk (TPRM)", "DLP"],
    tech: ["OPA/Rego", "GuardDuty", "IAM", "KMS", "WAF", "Wazuh", "Splunk", "Suricata"],
    evidence: [
      { label: "Automated incident response", href: "/projects/aws-automated-incident-response/" },
      { label: "Serverless CSPM", href: "/projects/serverless-cspm/" },
      { label: "ISO audit support · Fixerra", href: "/experience/" },
      { label: "Detection & SOC writing", href: "/writing/#detection-soc" },
    ],
  },
  {
    id: "observability",
    title: "Observability & Reliability",
    approach: [
      "Measure from more than one side: what the autoscaler sees vs what workers report. When the two disagree, the gap is usually the bug.",
      "Measure before optimizing, and report the expensive first run along with the fast ones.",
      "Telemetry has a cost. Event streams from an ephemeral fleet can load the system they observe.",
    ],
    concepts: ["APM", "infrastructure monitoring", "incident troubleshooting", "disaster recovery readiness", "graceful scale-down"],
    tech: ["New Relic", "CubeAPM", "Flower", "Splunk", "Wazuh"],
    evidence: [
      { label: "Observability rollout · HeyMarvin", href: "/experience/" },
      { label: "Two dashboards in the KEDA demo", href: "/projects/keda-scale-to-zero-workers/" },
      { label: "Runner benchmarks", href: "/projects/self-hosted-github-runners-caching/" },
    ],
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    approach: [
      "Assume at-least-once delivery: acks after work, timeouts longer than the longest task, idempotent workers.",
      "Scale on the signal that reflects the work waiting (queue depth), not on how busy the current workers look.",
    ],
    concepts: ["queue-based workloads", "retries & visibility timeouts", "event-driven autoscaling", "scale-to-zero"],
    tech: ["KEDA", "Celery", "Redis", "Kubernetes"],
    evidence: [
      { label: "Event-driven autoscaling · HeyMarvin", href: "/experience/" },
      { label: "KEDA scale-to-zero workers", href: "/projects/keda-scale-to-zero-workers/" },
    ],
  },
];
