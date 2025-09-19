# PRP Framework Summary 🏗️
*Your Complete Guide to AI-Driven Software Development*

---

## 🎯 What is the PRP Framework?

**PRP (Product Requirement Prompt)** is a systematic approach to building software using AI agents. Instead of hoping code works, you create detailed "construction blueprints" that AI agents follow to build features correctly the first time.

**Core Principle**: Over-specify the context and implementation details while under-specifying what to build leads to 80% failure. PRPs fix this by providing comprehensive context for one-pass implementation success.

---

## 🏢 The Construction Crew Analogy

Think of PRP commands as specialized workers in a construction company:

| Role | Command | Purpose | When to Use |
|------|---------|---------|-------------|
| 🏗️ **Master Architect** | `/prp-planning-create` | Create comprehensive architectural plans | Vague ideas → detailed specifications |
| 📋 **Structural Engineer** | `/api-contract-define` | Define how components connect | Frontend ↔ Backend integration |
| 📐 **Detail Architect** | `/prp-base-create` | Create step-by-step construction manual | Complex new features |
| 🔧 **Renovation Specialist** | `/prp-spec-create` | Plan modifications to existing code | Migrations, refactoring, upgrades |
| 📖 **Story Coordinator** | `/prp-story-create` | Convert user stories into implementation tasks | User stories → executable plans |
| ✅ **Project Foreman** | `/prp-task-create` | Create focused work orders | Small, specific changes |
| 🔨 **Master Builder** | `/prp-base-execute` | Build entire features | After comprehensive planning |
| 🏠 **Renovation Team** | `/prp-spec-execute` | Execute renovation plans | Transform existing code |
| ⚡ **Specialist Crew** | `/prp-task-execute` | Handle focused tasks | Surgical precision changes |

---

## 📋 Command Categories & Use Cases

### 🎯 **Planning Commands** (Create the Blueprints)

#### `/prp-planning-create` - Master Architectural Planning
**Purpose**: Transform rough ideas into comprehensive PRDs with rich visual documentation

**Use Cases**:
- "I want users to be able to like posts" → Complete social media feature specification
- "Add user authentication" → Comprehensive auth system with flows and diagrams
- "Build a dashboard" → Full dashboard architecture with components and data flow

**What It Creates**:
- User flow diagrams (happy path, error scenarios)
- Technical architecture diagrams
- API specifications with examples
- Implementation phases and dependencies
- Risk assessment with mitigations

**Example Output**: `PRPs/user-authentication-prd.md`

#### `/api-contract-define` - Frontend ↔ Backend Integration Specs
**Purpose**: Create detailed specifications for how frontend and backend communicate

**Use Cases**:
- After planning: "Define APIs for user auth system in PRPs/user-auth-prd.md"
- Before implementation: Prevent integration issues between teams
- Documentation: Exact endpoint definitions with TypeScript interfaces

**What It Creates**:
- Exact API endpoints (`POST /api/users/{id}/like`)
- TypeScript interfaces for frontend
- Error response specifications
- WebSocket events for real-time features

**Example Output**: `PRPs/contracts/user-auth-api-contract.md`

#### `/prp-story-create` - User Story to Implementation Converter
**Purpose**: Convert user stories into tactical implementation plans through deep codebase analysis

**Use Cases**:
- Sprint planning: "As a user, I want to edit my profile so I can update my information"
- Feature tickets: Transform Jira/GitHub issues into executable tasks
- Task breakdown: Decompose complex stories into atomic tasks

**What It Creates**:
- Atomic, independently testable tasks
- Codebase pattern analysis and integration points
- Dependency-ordered implementation sequence
- Validation commands for each task

**Example Output**: `PRPs/story_profile-editing.md`

---

### 🔨 **Implementation Commands** (Build the Blueprints)

#### `/prp-base-create` - Comprehensive Implementation Manual
**Purpose**: Create detailed construction manuals with every implementation detail specified

**Use Cases**:
- New features: "Implement user auth using PRPs/user-auth-prd.md and contracts"
- Complex systems: Features requiring multiple components and integrations
- First-time implementations: When you need all context and examples

**What It Creates**:
- Step-by-step implementation tasks in dependency order
- All necessary context (file patterns, documentation links)
- 4-level validation system (syntax → unit → integration → domain)
- Specific naming conventions and placement guidance

**Example Output**: `PRPs/user-auth-implementation.md`

#### `/prp-spec-create` - Transformation Planning
**Purpose**: Plan how to modify existing code with clear current → desired state mapping

**Use Cases**:
- Migrations: "Migrate from cookies to JWT authentication"
- Refactoring: "Convert class components to functional components"
- Upgrades: "Upgrade from React 17 to React 19"
- Architecture changes: "Move from REST to GraphQL"

**What It Creates**:
- Current state documentation (what exists now)
- Desired state specification (what it should become)
- Hierarchical transformation objectives
- Rollback strategies for safety

**Example Output**: `SPEC_PRP/PRPs/jwt-migration.md`

#### `/prp-task-create` - Focused Work Orders
**Purpose**: Generate comprehensive task lists for small, focused changes

**Use Cases**:
- Bug fixes: "Fix email validation on signup form"
- Small features: "Add dark mode toggle to settings"
- Maintenance: "Update dependencies and fix breaking changes"
- Quick enhancements: "Add loading spinners to buttons"

**What It Creates**:
- Focused task breakdown with minimal scope
- Immediate validation after each step
- Debug strategies and rollback plans
- Performance and security checks

**Example Output**: `TASK_PRP/PRPs/dark-mode-toggle.md`

---

### ⚡ **Execution Commands** (Do the Work)

#### `/prp-base-execute` - Build Complete Features
**Purpose**: Execute comprehensive implementation plans with progressive validation

**Use Cases**:
- After `/prp-base-create`: Build the planned feature
- Major features: Complete user auth, dashboards, API systems
- New development: When you have detailed implementation guide

**Process**:
1. Load PRP and absorb all context
2. Create implementation plan with TodoWrite
3. Execute tasks in dependency order
4. Run 4-level validation system
5. Verify completion against success criteria

#### `/prp-spec-execute` - Transform Existing Code
**Purpose**: Execute transformation plans for existing codebases

**Use Cases**:
- After `/prp-spec-create`: Execute the planned changes
- Migrations: Database, authentication, framework upgrades
- Refactoring: Architecture improvements and code quality

#### `/prp-task-execute` - Handle Focused Tasks
**Purpose**: Execute small, focused changes with surgical precision

**Use Cases**:
- After `/prp-task-create`: Complete the specific task
- Bug fixes: Targeted problem resolution
- Small features: Quick additions and improvements

---

## 🔄 **Optimal Command Sequences**

### **🏗️ New Feature Development (Most Common)**
```bash
# 1. Load project context
/prime-core

# 2. Create comprehensive plan
/prp-planning-create "user profile management with avatar upload"

# 3. Define API integration
/api-contract-define "create APIs for user profile described in PRPs/user-profile-prd.md"

# 4. Create implementation guide
/prp-base-create "implement user profile using PRPs/user-profile-prd.md and PRPs/contracts/user-profile-api.md"

# 5. Build the feature
/prp-base-execute PRPs/user-profile-implementation.md
```

### **🔧 Modifying Existing Code**
```bash
# 1. Plan the transformation
/prp-spec-create "migrate authentication from basic auth to OAuth2"

# 2. Execute the changes
/prp-spec-execute SPEC_PRP/PRPs/oauth2-migration.md
```

### **📖 User Story Implementation**
```bash
# 1. Convert story to implementation plan
/prp-story-create "As a user, I want to reset my password via email"

# 2. Execute the implementation
/prp-base-execute PRPs/story_password-reset.md
```

### **✅ Small Focused Tasks**
```bash
# 1. Define the task
/prp-task-create "add email validation with proper error messages"

# 2. Complete the task
/prp-task-execute TASK_PRP/PRPs/email-validation.md
```

### **⚡ Rapid Development (Hackathons/MVPs)**
```bash
/prime-core
/hackathon-research "social media dashboard with posts and likes"
/hackathon-prp-parallel "MVP social dashboard"
/prp-base-execute PRPs/social-dashboard-mvp.md
```

---

## 🎯 **When to Use Each Command**

### **Use `/prp-planning-create` when:**
- ✅ You have a vague idea that needs concrete planning
- ✅ Starting a new major feature
- ✅ Need comprehensive documentation with diagrams
- ✅ Want to research and understand the problem space

### **Use `/api-contract-define` when:**
- ✅ You have architectural plans and need technical specs
- ✅ Frontend and backend teams need coordination
- ✅ You want to prevent integration issues
- ✅ Need exact API endpoint definitions

### **Use `/prp-story-create` when:**
- ✅ You have user stories to implement
- ✅ Need to convert tickets into executable tasks
- ✅ Want systematic codebase analysis before implementation
- ✅ Sprint planning requires task breakdown

### **Use `/prp-base-create` when:**
- ✅ Building something completely new
- ✅ Need comprehensive implementation instructions
- ✅ Want all context and examples included
- ✅ Require full 4-level validation process

### **Use `/prp-spec-create` when:**
- ✅ Modifying existing code
- ✅ Doing migrations or refactoring
- ✅ Need current vs. desired state documentation
- ✅ Want rollback plans for safety

### **Use `/prp-task-create` when:**
- ✅ Making small, focused changes
- ✅ Need surgical precision on specific code
- ✅ Want immediate validation after each step
- ✅ Change affects only a few files

---

## 🚫 **Common Mistakes to Avoid**

### **❌ Using Commands in Isolation**
```bash
# WRONG - each command creates isolated work
/api-contract-define "user authentication"
/prp-base-create "user authentication"
```

```bash
# RIGHT - each command builds on previous
/prp-planning-create "user authentication with social login"
/api-contract-define "create API for auth described in PRPs/user-auth-prd.md"
/prp-base-create "implement auth using PRPs/user-auth-prd.md and PRPs/contracts/user-auth-api.md"
```

### **❌ Skipping the Planning Phase**
```bash
# WRONG - jumping straight to implementation
/prp-base-create "complicated feature"
```

```bash
# RIGHT - plan first, then implement
/prp-planning-create "complicated feature"
/prp-base-create "implement feature using PRPs/complicated-feature-prd.md"
```

### **❌ Being Vague**
```bash
# WRONG - vague and unhelpful
/prp-base-create "make the app better"
```

```bash
# RIGHT - specific and actionable
/prp-base-create "add user profile editing with avatar upload, bio editing, and email preferences"
```

---

## 🔍 **4-Level Validation System**

Every PRP includes a comprehensive validation system:

### **Level 1: Foundation Check**
```bash
npm run lint && npm run type-check
```
*Like checking if the foundation meets building codes*

### **Level 2: Component Check**
```bash
npm test
```
*Like testing if each room functions correctly*

### **Level 3: Systems Integration Check**
```bash
curl -X POST http://localhost:3000/api/users/login
```
*Like testing if all systems work together*

### **Level 4: Real-World Stress Test**
*Domain-specific validation, performance testing, security scans*

---

## 🚀 **Success Principles**

### **🔗 Always Chain Commands**
Each command should reference outputs from previous commands to build comprehensive context.

### **📝 Be Specific in Requests**
Include specific technical details, frameworks, and constraints in your prompts.

### **🔍 Trust the Validation System**
Let each command run through all validation levels - they catch issues before they become problems.

### **🏗️ Think Like an Architect**
Plan the foundation before building walls. Design overall structure before implementing components.

### **📚 Include Context**
Reference existing code patterns, documentation URLs, and similar implementations in your codebase.

---

## 📚 **Quick Reference Card**

| Command | Input | Output | Next Step |
|---------|-------|--------|-----------|
| `/prp-planning-create` | Rough idea | Comprehensive PRD | `/api-contract-define` |
| `/api-contract-define` | Feature + PRD | API contracts | `/prp-base-create` |
| `/prp-story-create` | User story | Implementation tasks | `/prp-base-execute` |
| `/prp-base-create` | Feature + references | Construction guide | `/prp-base-execute` |
| `/prp-spec-create` | Change requirements | Transformation plan | `/prp-spec-execute` |
| `/prp-task-create` | Specific task | Detailed task list | `/prp-task-execute` |
| Execute commands | PRP file path | Working code | Git commit |

---

## 🎯 **For Next.js + FastAPI Projects**

**Recommended Sequence**:
1. `/prime-core` - Load project context
2. `/prp-planning-create` - Plan your feature
3. `/api-contract-define` - Define frontend ↔ backend APIs
4. `/prp-base-create` - Create implementation guide
5. `/prp-base-execute` - Build the feature
6. `/smart-commit` - Commit with proper messaging
7. `/create-pr` - Create pull request

**For User Stories**:
1. `/prime-core`
2. `/prp-story-create` - Convert story to tasks
3. `/prp-base-execute` - Implement the story

**For Quick Changes**:
1. `/prp-task-create` - Define focused task
2. `/prp-task-execute` - Complete the task

---

**Remember**: You're the architect deciding WHAT to build. AI is your construction crew figuring out HOW to build it. The PRP system ensures quality through proper planning, validation, and documentation. 🏗️✨