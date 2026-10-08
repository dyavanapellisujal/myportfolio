import type { ProjectCuration } from "@/lib/types";

// Hand-written project metadata, keyed by GitHub repository name.
// Repo facts (URL, languages, dates, fork status) come from
// data/github-repos.json — run `npm run sync:github` to refresh it.
//
// Study / practice repositories are kept below with `hidden: true` so the
// GitHub sync does not re-list them.
//
// Every claim below is taken from the repository README / code, the linked
// write-up, or the resume. Keep it that way.

const MEDIUM = "https://medium.com/@dyavanapellisujal7";

export const curations: ProjectCuration[] = [
  // ───────────────────────────── Featured ─────────────────────────────
  {
    repo: "GitOps-Driven-Multi-Cluster-EKS-Platform",
    slug: "multi-cluster-eks-gitops",
    title: "Multi-Cluster EKS Platform with GitOps",
    tier: "featured",
    order: 1,
    problem:
      "Every new region, environment or service turns into a one-off infrastructure project, and pre-production quietly drifts away from production.",
    why: "I built a multi-cluster EKS platform as a Platform Engineer at HeyMarvin. This is a generalized version of that platform shape: one where adding a region or onboarding a service is a config change and a git push, with the reasoning behind each piece written down.",
    approach:
      "Three layers with one owner each: Terraform provisions EKS from a single root module plus per-environment tfvars, every service ships as its own Helm chart, and a hub ArgoCD reconciles everything through a two-layer ApplicationSet.",
    tech: ["Amazon EKS", "Terraform", "Helm", "ArgoCD", "Karpenter", "EKS Pod Identity", "KEDA", "AWS IAM"],
    concepts: ["GitOps", "multi-cluster", "hub-and-spoke", "least privilege", "dependency ordering", "12-factor"],
    caseStudy: {
      scope:
        "Generalized from the multi-cluster EKS platform I built at HeyMarvin, published as a blueprint with a long-form design write-up (in the README). Company-specific details are removed; account IDs and environment names are placeholders.",
      overview:
        "A blueprint for provisioning and operating multi-region EKS clusters. It is split across three concerns (infrastructure, packaging and deployment intent), each in its own directory and each owned by one tool. Most of the write-up is about the decisions and what each one cost.",
      problem: [
        "A directory per environment in Terraform (prod/, staging/) starts drifting the day it is created.",
        "Running ArgoCD inside every cluster means N installs, N upgrades and N sets of credentials.",
        "Attaching permissions to the node role gives every pod on the node the union of all permissions.",
        "Node autoscalers can starve themselves: if the autoscaler cannot schedule, it cannot add the node it needs.",
      ],
      architecture: {
        caption: "Three layers, one source of truth each",
        stages: [
          { title: "eks-terraform", items: ["single root module", "tfvars per env: common · eks-cluster · node-groups · addons · pod-identity", "S3 backend per cluster", "tf.sh wrapper"] },
          { title: "helm-charts", items: ["one chart per service", "envs/<env>-values.yaml", "web + worker Deployments, HPA, KEDA ScaledJob", "karpenter-config chart"] },
          { title: "gitops", items: ["Root Application: registers clusters", "per-env ApplicationSet", "Git generator globs service-*/envs/<env>-values.yaml", "multi-source for upstream charts"] },
          { title: "EKS clusters", items: ["hub runs ArgoCD (EKS capability)", "spokes trust hub role via Access Entries", "Pod Identity per service account"] },
        ],
      },
      image: {
        src: "/images/projects/eks-platform.jpg",
        alt: "Sequence diagram: an engineer installs the root application set once; ArgoCD on the hub watches the GitOps repo, registers the target cluster, deploys the region ApplicationSet, then syncs every later git push without manual steps.",
        width: 1400,
        height: 870,
        caption: "Registering a region: one manual Helm install, then every later change is a git push.",
      },
      implementation: [
        "One Terraform root module for every cluster. Differences live only in .tfvars, and tf.sh pairs the right S3 backend with the right variable files so staging config can't be applied against prod state.",
        "IAM centralized in its own module: cluster role, node role and per-service Pod Identity roles, with least-privilege policy JSON organized per environment.",
        "CoreDNS pulled out of the EKS module into a standalone aws_eks_addon that depends on the managed node groups, with addon versions pinned to eksbuild tags.",
        "Karpenter controller pinned to a small on-demand node group with a NoSchedule taint. NodePool/EC2NodeClass are shipped as a Helm chart through ArgoCD.",
        "Hub-and-spoke ArgoCD: the hub's Pod Identity role is trusted by spoke clusters through EKS Access Entries; which clusters to manage is declared in Git.",
        "Two-layer ApplicationSet: a Root Application scans environments/* to register clusters and deploy that environment's ApplicationSet, which generates one Application per service.",
      ],
      decisions: [
        { decision: "Three repositories instead of a monorepo", tradeoff: "Clear ownership and a blast radius that stops at the repo edge; lost atomic cross-layer changes, so one change can mean three PRs." },
        { decision: "One Helm chart per service instead of an umbrella chart", tradeoff: "Independent sync, health and rollback per service; paid for with duplicated templates across charts." },
        { decision: "A single ArgoCD hub per region", tradeoff: "One control plane to operate (AWS-managed); a larger logical blast radius on the hub." },
        { decision: "EKS Pod Identity instead of IRSA or node-role permissions", tradeoff: "A compromised pod is limited to its own policy; many small policy files to keep honest." },
        { decision: "Dedicated on-demand node group for the Karpenter controller", tradeoff: "The autoscaler can never be starved; a small always-on node mostly sits idle." },
      ],
      challenges: [
        {
          title: "Terraform hangs on CoreDNS",
          detail: "Installed inline with the cluster, CoreDNS pods sat Pending because no nodes existed yet, and the apply waited without erroring. Fixed with an explicit depends_on on the node groups and a toleration for the Karpenter controller taint.",
        },
        {
          title: "The autoscaler that needs an autoscaler",
          detail: "If Karpenter's own controller can't schedule, it can't add capacity. A reserved, tainted node group gives it somewhere to always run.",
        },
      ],
      results: [
        "Adding a region means adding a tfvars directory, values files and an environment entry, then running tf.sh and a git push.",
        "Onboarding a service to a region means creating a values file with the right name; the Git generator discovers it.",
      ],
      lessons: [
        "Dependency ordering is part of the infrastructure definition, not an implementation detail.",
        "Cross-cluster management is two problems, trust and intent. Solve them in different places on purpose.",
        "A single codebase means you answer 'are these environments the same?' by reading a diff.",
      ],
    },
  },
  {
    repo: "queue-based-scaling-using-keda-kubernetes",
    slug: "keda-scale-to-zero-workers",
    title: "Scale-to-Zero Celery Workers with KEDA",
    tier: "featured",
    order: 2,
    problem:
      "Queue workers sit at 100% CPU whether 10 or 10,000 tasks are waiting, so CPU-based autoscaling can't see the backlog.",
    why: "I built KEDA scale-to-zero workers at HeyMarvin. This repo pulls that design out into a runnable demo, along with the Celery and KEDA settings that decide whether it actually works.",
    approach:
      "KEDA polls Redis queue depth and scales Celery workers from zero to N as Kubernetes Jobs, with a baseline durable consumer per queue. One image runs as producer or worker; a control panel charts backlog against pod count.",
    tech: ["Kubernetes", "KEDA", "Celery", "Redis", "Helm", "kind", "Python", "Flower", "Docker"],
    concepts: ["event-driven autoscaling", "scale-to-zero", "ScaledJob vs ScaledObject", "at-least-once delivery", "queue depth as signal"],
    related: [{ label: "Write-up (blog.md)", href: "https://github.com/dyavanapellisujal/queue-based-scaling-using-keda-kubernetes/blob/main/blog/blog.md" }],
    caseStudy: {
      scope:
        "Runnable local demo on kind of the scale-to-zero setup I built for production at HeyMarvin. Company-specific details are removed. The file-processing workload is swapped for a configurable sleep, and Kafka, managed Redis/TLS and Karpenter are simplified out locally.",
      overview:
        "make up brings up a kind cluster with KEDA, Redis, a Celery worker fleet, Flower and a control panel for bursting load. The same Helm chart deploys three scaling shapes so they can be compared on identical load.",
      problem: [
        "CPU utilization says nothing about how many workers you need: every worker is busy until its task ends.",
        "Celery defaults assume a fixed-size fleet. Prefetch, acks and visibility timeouts behave differently when pods come and go.",
        "Scale-to-zero breaks retries that rely on a countdown when nothing is left listening.",
      ],
      architecture: {
        caption: "Queue depth drives compute",
        stages: [
          { title: "Producer", items: ["control panel (MODE=api)", "apply_async to Redis lists", "one queue per tier"] },
          { title: "Broker", items: ["Redis LIST per queue", "HLEN unacked for in-flight"] },
          { title: "KEDA", items: ["polls LLEN every 5s", "ScaledJob: one Job per task", "activationListLength / scalingStrategy"] },
          { title: "Workers", items: ["TASK_LIMIT=1: run one task, exit", "baseline worker: durable consumer", "acks_late + visibility timeout"] },
        ],
      },
      image: {
        src: "/images/projects/keda-control-panel.jpg",
        alt: "Control panel mid-burst: 28 pending tasks, 21 active, 22 worker pods, with a chart of backlog versus capacity over time.",
        width: 1400,
        height: 1298,
        caption: "Control panel mid-burst: 28 pending, 21 active, 22 worker pods.",
      },
      implementation: [
        "Single Python image; MODE selects producer (HTTP API + UI) or worker. Bounded worker lifecycle: a Job takes one task, and exits 0 after WORKER_IDLE_TIMEOUT if the queue is empty.",
        "Helm chart with Deployments, ScaledJob, ScaledObject, ServiceAccount/RBAC and env overlays for the three variants (ScaledJob + baseline, ScaledObject 0..N, ScaledJob-only).",
        "Control panel reads queue depth the way KEDA does (LLEN) and pod counts from the Kubernetes API; Flower shows what workers report. When the two disagree, the gap is usually prefetch.",
        "Makefile for the whole lifecycle (up, burst, watch, describe-scaler, queue-depth, redeploy) plus pytest suites for config, tasks and the worker lifecycle.",
      ],
      decisions: [
        { decision: "ScaledJob + one always-on baseline worker per queue as the default", tradeoff: "Pods exit on their own (no mid-task HPA kills) and retries always have a listener; costs one idle pod per queue." },
        { decision: "PREFETCH_MULTIPLIER = 1", tradeoff: "KEDA sees the true backlog; workers can't batch-prefetch for throughput." },
        { decision: "acks_late with a visibility timeout longer than the longest task", tradeoff: "Evicted pods' tasks are redelivered; a too-short timeout runs tasks twice." },
        { decision: "One queue per tier instead of weighted priorities", tradeoff: "Each tier gets its own KEDA trigger and scaling; more queues to operate." },
      ],
      challenges: [
        { title: "Prefetch hides the backlog", detail: "With prefetch above 1, workers pull tasks out of the Redis list into memory. LLEN drains, KEDA scales down, and the work is still waiting." },
        { title: "Countdown retries vs scale-to-zero", detail: "A retry published with a countdown gets claimed by a one-task pod that then idles until the clock runs out. The zero-baseline variant is kept specifically to show this failure mode." },
        { title: "activationListLength off-by-one", detail: "Set above typical queue depth, the scaler never activates and the queue stays asleep." },
        { title: "Flower crash-loop", detail: "Kubernetes injected FLOWER_PORT=tcp://… from service links, which Flower read as its port. Fixed with enableServiceLinks: false." },
      ],
      results: [
        "Workers scale from a baseline to the configured ceiling during a burst and back down when the queue drains (see screenshot).",
        "Three variants are deployable from the same chart for side-by-side comparison on identical load.",
      ],
      lessons: [
        "Choose the scaling signal first. Queue depth beats CPU for queue workers.",
        "Most of the difficulty is in Celery defaults written for fixed fleets, not in KEDA itself.",
        "Monitoring an ephemeral fleet has its own cost: event streams from short-lived pods add churn on the same broker the scaler polls.",
      ],
    },
  },
  {
    repo: "Optimizing-Self-Hosted-GitHub-Runners-with-Caching",
    slug: "self-hosted-github-runners-caching",
    title: "Fast Self-Hosted GitHub Runners on Kubernetes",
    tier: "featured",
    order: 3,
    problem:
      "Actions Runner Controller gives every job a fresh pod with an empty disk, so Docker layers and actions/cache are thrown away or round-tripped over the internet on every run.",
    why: "I ran CI on self-hosted runners with in-cluster caching at HeyMarvin, which made deployments 65–70% faster. This workshop rebuilds the setup in public to show, with measurements, which cache buys which seconds, and to write down the silent failure modes that make caching quietly stop working.",
    approach:
      "Keep runners ephemeral and move the state into the cluster: a long-lived BuildKit daemon on a PVC for Docker layers, and an in-cluster Actions cache server on a PVC for actions/cache.",
    tech: ["Kubernetes", "Actions Runner Controller", "GitHub Actions", "BuildKit", "Docker", "Helm", "kind", "Next.js", "Flask"],
    concepts: ["ephemeral CI", "build caching", "remote BuildKit", "stateful vs stateless", "measuring before optimizing"],
    related: [{ label: "Medium article", href: `${MEDIUM}/your-self-hosted-github-runners-are-slow-because-theyre-supposed-to-be-d0a92696458e` }],
    caseStudy: {
      scope: "Hands-on workshop in 10 labs that runs entirely on kind on a laptop. Benchmarks are laptop numbers, presented as ratios.",
      overview:
        "A workshop that sets up ARC runner scale sets on a local cluster, builds a deliberately heavy app (a 275-page Next.js static export plus a large Python image), measures it, then fixes it with two separate caches.",
      problem: [
        "Docker layers (apt, pip wheels, base images) are lost when the runner pod is deleted.",
        "actions/cache isn't broken on self-hosted runners, but it talks to GitHub's backend, so a 460 MB node_modules goes out over the internet and back on every save and restore.",
      ],
      architecture: {
        caption: "Red is thrown away after every job; green survives",
        stages: [
          { title: "GitHub Actions", items: ["job queued"] },
          { title: "arc-systems", items: ["listener", "ARC controller patches replicas"] },
          { title: "arc-runners", items: ["ephemeral runner pod", "buildkitd (long-lived) + PVC"] },
          { title: "cache-system", items: ["Actions cache server + PVC", "npm / .next cache"] },
        ],
      },
      image: {
        src: "/images/projects/runners-architecture.jpg",
        alt: "Architecture: GitHub Actions notifies the ARC listener, the controller creates an ephemeral runner pod, which sends docker builds to a long-lived buildkitd with a PVC and actions/cache traffic to an in-cluster cache server with a PVC.",
        width: 778,
        height: 1400,
      },
      implementation: [
        "kind cluster, ARC controller and runner scale set, with GitHub credentials supplied by the user.",
        "Benchmark workflows that differ in exactly three lines: driver: remote to tcp://buildkitd:1234, one actions/cache step, and cache-from/cache-to.",
        "BuildKit Deployment with a PVC and a cache-server Deployment with a PVC; the runner points at the cache server via CUSTOM_ACTIONS_RESULTS_URL.",
        "Frontend built outside Docker so only the exported bundle enters the image, which is why two caches are needed instead of one.",
      ],
      decisions: [
        { decision: "Keep runner pods ephemeral; put state in the cluster", tradeoff: "No 'works on runner 3 only' drift; two extra stateful services with PVCs to run." },
        { decision: "Retrofit in cluster, not in workflows", tradeoff: "Existing workflows barely change; the cluster owns more moving parts." },
        { decision: "Use a forked runner image that honours CUSTOM_ACTIONS_RESULTS_URL", tradeoff: "Survives self-update unlike a binary patch; depends on a third-party image being kept current." },
      ],
      challenges: [
        { title: "ACTIONS_RESULTS_URL is overwritten per job", detail: "It can't be set as a plain env var, hence the forked runner image. The trailing slash on the custom URL is required." },
        { title: "Docker Hub rejects BuildKit's default cache manifests", detail: "cache-to needs image-manifest=true,oci-mediatypes=true. The build succeeds; only the cache export fails, at the very end." },
        { title: "Masked usernames", detail: "A Docker Hub username stored as a Secret is masked in logs, turning every image tag into ***/…. It belongs in Variables." },
      ],
      results: [
        "Whole Docker build: 231 s cold → 3 s warm, with 11 layers CACHED (laptop).",
        "pip wheel stage alone: 119 s cold → CACHED.",
        "Caveat stated in the write-up: the first cached run can be slower than the uncached one, because it fills both caches.",
      ],
      lessons: [
        "Measure the slow build first. Without that number, the rest is guesswork.",
        "Delete the BuildKit pod and the build is still fast. What matters is the volume, not the builder.",
        ".next/cache speeds up compilation, not prerendering.",
      ],
    },
  },
  {
    repo: "opsmemory",
    slug: "opsmemory",
    title: "OpsMemory — Engineering Memory Platform",
    tier: "featured",
    order: 4,
    problem:
      "Operational knowledge gets lost: runbooks go stale, postmortems get buried, and context from incident calls sits in someone's head.",
    why: "Built for a hackathon around Cognee, to test whether a graph-backed memory layer gives better incident answers than plain RAG.",
    approach:
      "Every input (documents, HTTP docs, meeting transcripts, taught lessons) flows through one MemoryEngine port. PostgreSQL + pgvector is the cited source of truth, Cognee and Kuzu hold the knowledge graph, and retrieval is hybrid and intent-routed.",
    tech: ["Python", "FastAPI", "Cognee", "PostgreSQL", "pgvector", "Kuzu", "Alembic", "Docker", "Helm", "kind", "MCP"],
    concepts: ["hybrid vector + graph retrieval", "cited answers", "incident knowledge", "ports & adapters", "ADRs"],
    related: [{ label: "Medium article", href: `${MEDIUM}/from-tribal-knowledge-to-cognitive-architecture-building-opsmemory-with-cognee-12838bb84f3e` }],
    caseStudy: {
      scope: "Hackathon MVP. All ten planned milestones are marked complete in the README; GitHub/Slack connectors, RBAC and scheduled sync are deferred.",
      overview:
        "An API, CLI, web app and MCP server over a single memory layer. Each incident is a growing knowledge object with auto-generated, cited documentation and a scoped AI chat. A Recall.ai bot can join an engineering meeting and feed the transcript into the incident.",
      problem: [
        "Document search returns chunks, not how incidents, services and root causes relate.",
        "Lessons from incident calls rarely make it into written docs.",
        "AI answers about production are useless without citations and a confidence signal.",
      ],
      architecture: {
        caption: "Everything converges on one MemoryEngine port",
        stages: [
          { title: "Connectors", items: ["files: MD / TXT / PDF", "HTTP docs crawler", "Recall.ai meetings", "manual teaching"] },
          { title: "Processing", items: ["parse", "heading-aware chunking", "relationship extraction"] },
          { title: "Memory", items: ["PostgreSQL + pgvector (citations)", "Cognee knowledge graph", "Kuzu embedded graph"] },
          { title: "Retrieval → surfaces", items: ["semantic + graph + keyword + metadata", "LLM reasons over cited evidence", "web · CLI · REST · MCP"] },
        ],
      },
      implementation: [
        "FastAPI service with Alembic migrations; Docker Compose for local and a Helm chart (migrations as a hook) for a one-command kind lab.",
        "Connector framework: adding a source means turning a signal into text and calling remember().",
        "Teaching pipeline with duplicate detection, so repeated lessons raise confidence instead of duplicating knowledge.",
        "Configurable providers for embeddings and reasoning, with keyless fallbacks so the stack runs without API keys.",
        "MCP server exposing ask, search, teach, graph_neighbors and service_dependencies to MCP clients.",
        "Quality gate: ruff, mypy (strict), pytest and helm lint behind make check; decisions recorded as ADRs.",
      ],
      decisions: [
        { decision: "PostgreSQL + pgvector as the source of truth, the graph as a projection", tradeoff: "Every answer can cite durable records; two stores to keep consistent." },
        { decision: "Cognee behind a MemoryEngine port", tradeoff: "The engine can be swapped (a native pgvector engine backs the test suite); one more abstraction layer." },
        { decision: "Platform orchestrates, the LLM only reasons over curated evidence", tradeoff: "Answers are traceable; retrieval quality caps answer quality." },
      ],
      challenges: [
        { title: "Graph building needs an embeddings provider", detail: "Without a key the engine falls back to the pgvector substrate and logs that graph-building is inactive, so the platform still works." },
        { title: "Deletion has to cascade", detail: "Removing a meeting or incident prunes memory (forget()) and regenerates the incident's documentation." },
      ],
      results: [
        "End-to-end flow: create an incident, upload evidence, get cited living documentation, chat scoped to the incident, and view the knowledge graph.",
        "Runs locally via Docker Compose or on Kubernetes via make lab.",
      ],
      lessons: [
        "For incident knowledge, relationships between services, teams and causes matter as much as text similarity.",
        "Keep a durable, citable substrate under any AI memory layer.",
      ],
    },
  },
  {
    repo: "serverless-cspm",
    slug: "serverless-cspm",
    title: "Real-Time Serverless CSPM",
    tier: "featured",
    order: 5,
    problem:
      "Cloud misconfigurations such as public S3 buckets, unencrypted storage, open SSH and weak KMS key policies are cheap to make and easy to miss between periodic audits.",
    why: "To evaluate resources the moment they change, with the rules written as policy-as-code instead of buried in scripts.",
    approach:
      "EventBridge captures resource changes, Python Lambda auditors evaluate the resource against OPA Rego policies, findings land in MongoDB, and a Flask API + React dashboard surfaces risk, remediation and reports.",
    tech: ["AWS Lambda", "EventBridge", "SQS", "Open Policy Agent (Rego)", "MongoDB Atlas", "Terraform", "Python", "Flask", "React"],
    concepts: ["policy-as-code", "event-driven auditing", "cloud security posture", "automated remediation"],
    caseStudy: {
      scope: "Project, demonstrated through a six-stage test sequence (repo testcase.md). Not run against a production estate.",
      overview:
        "A CSPM that audits S3 (public access, encryption, ACLs), checks EC2 security groups for unrestricted SSH, and correlates S3 buckets with the KMS key policies that protect them. Results are visualized and can be remediated from a dashboard.",
      problem: [
        "Scheduled scans leave a window between a risky change and its detection.",
        "Rules hard-coded in scripts are hard to review and extend.",
        "An S3 bucket can look private while the KMS key protecting it has a permissive policy.",
      ],
      architecture: {
        caption: "Detection → audit → storage → presentation",
        stages: [
          { title: "Detection", items: ["EventBridge rules", "CreateBucket, AuthorizeSecurityGroupIngress, …"] },
          { title: "Audit", items: ["Python Lambdas: S3Audit, KMSAudit", "evaluate against OPA Rego policies"] },
          { title: "Storage", items: ["MongoDB Atlas findings", "risk assessment per resource"] },
          { title: "Presentation", items: ["Flask API", "React dashboard", "remediation + PDF reports"] },
        ],
      },
      implementation: [
        "Modular Terraform deploys the Lambdas, EventBridge rules and supporting resources; MongoDB connection details come from tfvars/.env that are never committed.",
        "S3 auditor checks public access blocks, encryption and ACLs; KMS auditor inspects key policies linked to buckets.",
        "Rego policies migrated to OPA v1 syntax and validated with end-to-end integration tests.",
        "Dashboard remediation requires typing DELETE before removing a non-compliant resource.",
      ],
      decisions: [
        { decision: "OPA/Rego for rules instead of Python conditionals", tradeoff: "Policies are reviewable and testable on their own; another runtime for the Lambdas to call." },
        { decision: "Event-driven instead of scheduled scanning", tradeoff: "Near-real-time detection; changes made before deployment aren't audited until they change again." },
      ],
      challenges: [
        { title: "OPA connectivity and syntax drift", detail: "Moving to OPA v1 Rego syntax and fixing connectivity between the auditors and OPA took a dedicated round of integration testing." },
        { title: "Secrets hygiene", detail: "Credentials were moved to environment files excluded from version control and purged from repository history." },
      ],
      results: [
        "Six demo stages: public S3 exposure, encryption violation, open SSH (0.0.0.0/0), KMS deep audit, dashboard remediation and PDF incident reporting.",
      ],
      lessons: [
        "Correlating services (S3 ↔ KMS) catches risks a per-service check misses.",
        "Destructive remediation needs explicit human confirmation.",
      ],
    },
  },
  {
    repo: "Automated-Incident-Response-In-AWS",
    slug: "aws-automated-incident-response",
    title: "Automated Serverless Incident Response on AWS",
    tier: "featured",
    order: 6,
    problem:
      "When EC2 instance credentials are stolen and used outside AWS, every minute of manual triage is a minute the attacker keeps access.",
    why: "To build and test the full loop from a real attack, not GuardDuty's sample findings, through detection to automated containment.",
    approach:
      "GuardDuty detects the exfiltrated credentials, an EventBridge rule routes high-severity IAM findings to a Python Lambda, and the Lambda blocks the attacker at the NACL, enforces IMDSv2, swaps the IAM role to invalidate the stolen credentials, and notifies via SNS.",
    tech: ["Amazon GuardDuty", "EventBridge", "AWS Lambda", "Python (Boto3)", "SNS", "SSM Parameter Store", "Terraform", "VPC NACLs", "IAM"],
    concepts: ["automated containment", "IMDSv2", "credential invalidation", "least privilege", "attack simulation"],
    related: [{ label: "Medium article", href: `${MEDIUM}/serverless-incident-response-workflow-on-aws-using-guardduty-eventbridge-sns-lambda-b24914b96581` }],
    caseStudy: {
      scope: "Project in a personal AWS test environment, with a deliberately vulnerable app. Terraform modules need your own account ID filled in.",
      overview:
        "A detection-to-containment pipeline built from AWS-native services, tested against a simulated SSRF credential theft. Resume figure: average containment in under 10 minutes; in the write-up, GuardDuty raised the finding in under 5 minutes.",
      problem: [
        "SSRF against an instance on IMDSv1 can read the role's temporary credentials from the metadata service.",
        "Those STS credentials stay valid for hours unless something actively invalidates them.",
      ],
      architecture: {
        caption: "Detect → route → contain → notify",
        stages: [
          { title: "GuardDuty", items: ["InstanceCredentialExfiltration.OutsideAWS", "Recon:IAMUser/TorIPCaller"] },
          { title: "EventBridge", items: ["prefix UnauthorizedAccess:IAMUser/", "severity ≥ 7"] },
          { title: "Lambda (Python)", items: ["NACL deny in/out for attacker IP", "enforce IMDSv2", "swap to <role>-backup", "rule numbers in SSM"] },
          { title: "SNS", items: ["instance, actions taken, status of each"] },
        ],
      },
      image: {
        src: "/images/projects/incident-response-architecture.svg",
        alt: "AWS architecture diagram of the automated threat detection workflow with GuardDuty, EventBridge, Lambda, SNS, and the affected EC2 instance in a VPC subnet.",
        width: 2211,
        height: 1381,
      },
      architectureNotes: [
        "Attack simulation: a Flask app with an SSRF-vulnerable /fetch endpoint on an IMDSv1 instance. Stolen credentials were used from a VM outside AWS, routed through Tor with proxychains.",
      ],
      implementation: [
        "EventBridge pattern matches only UnauthorizedAccess:IAMUser/* findings with severity ≥ 7.0, targeting the Lambda through a scoped invoke role.",
        "Network containment at the NACL (subnet scope) rather than the security group, with the next free rule number tracked in SSM Parameter Store to avoid collisions.",
        "IMDSv2 enforced on the instance: the PUT token request it requires is not possible through the GET-only SSRF endpoint.",
        "IAM role swapped for a pre-created <role>-backup on all instances using it, invalidating the stolen STS credentials immediately instead of waiting hours for expiry.",
        "Lambda execution role written for least privilege: explicit EC2 metadata/instance-profile and SNS publish actions on named resources rather than wildcards.",
        "Terraform modules for networking, EC2, GuardDuty, EventBridge, IAM, Lambda, S3 and SNS.",
      ],
      decisions: [
        { decision: "NACL deny instead of security group change", tradeoff: "Subnet-wide, immediate containment covering ingress and egress; broader blast radius than an instance-level rule." },
        { decision: "Role swap to force credential invalidation", tradeoff: "Kills the attacker's session now; apps using static credentials (not SDK refresh) need retry handling." },
      ],
      challenges: [
        { title: "NACL rule number collisions", detail: "Rule numbers must be unique and order matters. Specific blocks get low numbers (high priority), and the last used number is persisted in Parameter Store." },
      ],
      results: [
        "Average containment under 10 minutes (resume).",
        "Verified after a re-run: IMDSv2 enforced, role replaced with the backup, NACL updated, stolen credentials invalid.",
      ],
      lessons: [
        "Test response automation with a real signal, not sample findings.",
        "Overly broad instance roles widen the blast radius of any SSRF.",
      ],
    },
  },

  // ─────────────────────────── Engineering ───────────────────────────
  {
    repo: "cross-account-vpc-peering",
    slug: "cross-account-vpc-peering",
    title: "Cross-Account VPC Peering (Terraform)",
    tier: "engineering",
    order: 1,
    problem: "Full network-level connectivity between a security VPC and an application VPC in different AWS accounts, without traversing the internet.",
    approach: "Terraform modules per account plus an IAM module: the acceptor account exposes a role the requester assumes to accept the peering, then route tables, NACLs and security groups are scoped to specific CIDRs.",
    tech: ["Terraform", "AWS VPC", "IAM", "STS AssumeRole"],
    concepts: ["VPC peering", "IAM delegation", "route tables", "no transitive peering"],
    related: [{ label: "Medium article", href: `${MEDIUM}/secure-cross-account-vpc-communication-in-aws-using-peering-connections-2b3a28829fde` }],
    hidden: true,
  },
  {
    repo: "IAM_AUDIT_TOOL",
    slug: "iam-audit-tool",
    title: "AWS IAM Audit Tool",
    tier: "engineering",
    order: 2,
    problem: "Long-lived access keys and users without MFA are common IAM findings that are tedious to check by hand.",
    approach: "Python (Boto3) CLI that flags access keys older than a configurable age (30 days by default) and users without MFA, exporting to CSV or Excel.",
    tech: ["Python", "Boto3", "AWS IAM", "Bash"],
    concepts: ["IAM hygiene", "audit automation"],
    hidden: true,
  },
  {
    repo: "aws_badal_automation_scripts",
    slug: "aws-automation-scripts",
    title: "AWS Automation Scripts",
    tier: "engineering",
    order: 3,
    problem: "Repetitive AWS tasks: S3 bucket lifecycle, VPC setup and IAM key/MFA checks.",
    approach: "Bash scripts for S3 create/delete/policy checks and VPC setup, Python scripts for MFA audits and access-key rotation, and a CloudFormation template with a deploy script for S3.",
    tech: ["Bash", "Python", "AWS CLI", "CloudFormation"],
    concepts: ["scripting", "IaC basics"],
    hidden: true,
  },
  {
    repo: "apache_web_server_installation_terraform",
    slug: "terraform-web-server",
    title: "Modular Terraform Web Server",
    tier: "engineering",
    order: 4,
    problem: "Provisioning a web server on AWS reproducibly instead of through the console.",
    approach: "Separate networking and EC2 modules composed from a root module, with remote state in S3.",
    tech: ["Terraform", "AWS EC2", "AWS VPC", "S3 backend"],
    concepts: ["Terraform modules", "remote state"],
    hidden: true,
  },
  {
    repo: "AWS-Three-Tier-Blog-App",
    slug: "aws-three-tier-architecture",
    title: "AWS Three-Tier Architecture (design)",
    tier: "engineering",
    order: 5,
    problem: "Designing a three-tier web application layout on AWS.",
    approach: "Architecture diagram only (draw.io); the repository contains no implementation code.",
    tech: ["AWS", "draw.io"],
    concepts: ["three-tier architecture"],
    hidden: true,
  },
  {
    repo: "Terraform",
    slug: "terraform-scripts",
    title: "Early Terraform Scripts",
    tier: "lab",
    order: 5,
    problem: "First Terraform configurations while learning the tool.",
    approach: "A single EC2 configuration.",
    tech: ["Terraform", "AWS EC2"],
    concepts: ["learning"],
    hidden: true,
  },

  // ───────────────────────────── Security ─────────────────────────────
  {
    repo: "suricata_rules-nmap",
    slug: "suricata-nmap-rules",
    title: "Suricata Rules for Nmap Scan Detection",
    tier: "security",
    order: 1,
    problem: "Default rule sets don't reliably flag the individual Nmap scan techniques.",
    approach: "Custom Suricata rules for SYN, NULL, FIN and XMAS scans, split into internal-to-internal and internet-sourced variants, using TCP flags, window size and a detection_filter threshold (10 hits in 15 s per source). Includes a test script that runs each scan type.",
    tech: ["Suricata", "Nmap", "Bash"],
    concepts: ["network IDS", "signature writing", "thresholding"],
    related: [{ label: "Medium article", href: `${MEDIUM}/developing-suricata-rules-for-detectiing-nmap-scans-bae19c652683` }],
    hidden: true,
  },
  {
    repo: "SplunkQueries",
    slug: "splunk-anomaly-queries",
    title: "Splunk Anomaly Queries (Sysmon)",
    tier: "security",
    order: 2,
    problem: "Spotting process injection and unusual network behaviour without static thresholds.",
    approach: "SPL over Sysmon events: processes creating remote threads (Event 8) more than two standard deviations above the mean, and per-image hourly network connections (Event 3) compared against a rolling 24-hour baseline.",
    tech: ["Splunk SPL", "Sysmon"],
    concepts: ["statistical baselining", "detection engineering"],
    hidden: true,
  },
  {
    repo: "asscppracticals",
    slug: "appsec-practicals",
    title: "Application Security Practicals",
    tier: "security",
    order: 4,
    problem: "Understanding web vulnerabilities by building both the vulnerable and the fixed version.",
    approach: "Paired vulnerable/secure Flask apps for XSS, CSRF, SQL injection and file upload validation, plus JWT, OAuth2 and bcrypt/PBKDF2 password hashing examples.",
    tech: ["Python", "Flask"],
    concepts: ["OWASP", "secure coding"],
    hidden: true,
  },
  {
    repo: "PowershellScripts",
    slug: "powershell-ad-scripts",
    title: "Active Directory PowerShell Scripts",
    tier: "security",
    order: 5,
    problem: "Routine Active Directory administration and log review.",
    approach: "Scripts for single and CSV bulk user creation, moving disabled users into a dedicated OU, and filtering the Security log for failed logons (Event ID 4625).",
    tech: ["PowerShell", "Active Directory"],
    concepts: ["Windows administration", "log filtering"],
    hidden: true,
  },
  {
    repo: "iptables",
    slug: "iptables-helper",
    title: "iptables Rule Helper",
    tier: "security",
    order: 6,
    problem: "Writing iptables rules for many addresses by hand.",
    approach: "Bash script that expands an IPv4 range into individual addresses and inserts INPUT rules for them.",
    tech: ["Bash", "iptables", "Linux"],
    concepts: ["host firewalling"],
    hidden: true,
  },

  // ─────────────────────────── Labs & early work ───────────────────────────
  {
    repo: "2FA",
    slug: "django-2fa",
    title: "Django Two-Factor Authentication",
    tier: "lab",
    order: 1,
    problem: "Adding a second factor to a web login.",
    approach: "Django app with OTP and per-user QR code generation for authenticator apps (built with a collaborator).",
    tech: ["Python", "Django"],
    concepts: ["2FA", "TOTP"],
    hidden: true,
  },
  {
    repo: "oss",
    slug: "os-algorithms",
    title: "Operating Systems Algorithms",
    tier: "lab",
    order: 2,
    problem: "Coursework implementations of core OS algorithms.",
    approach: "C implementations of FCFS, SJF and Round Robin scheduling, Banker's algorithm, FIFO/LRU page replacement and first/best/worst-fit allocation, plus dining philosophers in Python.",
    tech: ["C", "Python"],
    concepts: ["scheduling", "memory management", "deadlock avoidance"],
    hidden: true,
  },
  {
    repo: "NewsPaper-Article",
    slug: "django-newspaper",
    title: "Django Newspaper App",
    tier: "lab",
    order: 3,
    problem: "Early backend practice.",
    approach: "Django app with user accounts, articles and comments.",
    tech: ["Python", "Django"],
    concepts: ["web backend"],
    hidden: true,
  },
  {
    repo: "FlappyBird",
    slug: "flappy-bird",
    title: "Flappy Bird (pygame)",
    tier: "lab",
    order: 4,
    problem: "Early programming practice.",
    approach: "A Flappy Bird clone in pygame.",
    tech: ["Python", "pygame"],
    concepts: ["learning"],
    hidden: true,
  },
  {
    repo: "conductor",
    slug: "conductor-fork",
    title: "Conductor (fork)",
    tier: "lab",
    order: 6,
    problem: "Fork of conductor-oss/conductor, an event-driven orchestration platform, kept for reference.",
    approach: "No original changes in this fork.",
    tech: ["Java"],
    concepts: ["reference"],
    hidden: true,
  },

  // ─────────────────────────── Not shown ───────────────────────────
  // Superseded portfolio built from a template (still contains placeholder copy).
  { repo: "myportfolio", slug: "previous-portfolio", title: "Previous portfolio", tier: "lab", order: 99, problem: "", approach: "", tech: [], concepts: [], hidden: true },
  // Team fork, intentionally not shown.
  { repo: "Audit360", slug: "audit360", title: "Audit360", tier: "lab", order: 99, problem: "", approach: "", tech: [], concepts: [], hidden: true },
  // Empty repositories.
  { repo: "Blog-Post", slug: "blog-post", title: "Blog-Post", tier: "lab", order: 99, problem: "", approach: "", tech: [], concepts: [], hidden: true },
  { repo: "sujal-sample-devops-project", slug: "sample-devops-project", title: "Sample DevOps project", tier: "lab", order: 99, problem: "", approach: "", tech: [], concepts: [], hidden: true },
];
