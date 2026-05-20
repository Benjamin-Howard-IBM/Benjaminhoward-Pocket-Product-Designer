#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

print_banner() {
    cat <<'ART'

      /\_/\  ___
     ( o.o ) |  \~  Pocket Product Designer v2
      > ^ <  |__/   Modular design workspace.
     /|   |\
    (_|   |_)

ART
}

usage() {
    cat <<'EOF'
Usage:
  ./setup.sh [options]

Default with no options:
  ./setup.sh --all

Options:
  --all                     Install deps, core skills, optional modules, references, QMD, and OpenCode plugin.
  --core                    Install only core skills: designer, product-designer, design-method-finder, commit.
  --module NAME             Install one module. Repeatable.
                            Names: designer, product-designer, hashi-designer, design-method-finder,
                                   micro, commit, helios, hcp-ref, qmd, opencode-plugin, deps, impeccable
  --no-deps                 Skip npm install for storybook/showcase.
  --no-hcp-ref              Skip HCP Terraform UI reference sync.
  --no-qmd                  Skip QMD config bootstrap.
  --no-opencode-plugin      Skip OpenCode sound plugin install.
  --install-impeccable      Install optional external pbakaus/impeccable skill pack.
  -h, --help                Show this help.

Examples:
  ./setup.sh --core
  ./setup.sh --module qmd
  ./setup.sh --module product-designer --module qmd
  ./setup.sh --module impeccable
EOF
}

MODULES=()
RUN_ALL=0
RUN_CORE=0
INSTALL_DEPS=1
INSTALL_HCP_REF=1
INSTALL_QMD=1
INSTALL_OPENCODE_PLUGIN=1
INSTALL_IMPECCABLE_CHOICE="${INSTALL_IMPECCABLE:-}"

if [ "$#" -eq 0 ]; then
    RUN_ALL=1
fi

while [ "$#" -gt 0 ]; do
    case "$1" in
        --all)
            RUN_ALL=1
            shift
            ;;
        --core)
            RUN_CORE=1
            shift
            ;;
        --module)
            if [ -z "${2:-}" ]; then
                echo "Missing module name for --module" >&2
                exit 2
            fi
            MODULES+=("$2")
            shift 2
            ;;
        --no-deps)
            INSTALL_DEPS=0
            shift
            ;;
        --no-hcp-ref)
            INSTALL_HCP_REF=0
            shift
            ;;
        --no-qmd)
            INSTALL_QMD=0
            shift
            ;;
        --no-opencode-plugin)
            INSTALL_OPENCODE_PLUGIN=0
            shift
            ;;
        --install-impeccable)
            INSTALL_IMPECCABLE_CHOICE=1
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            usage >&2
            exit 2
            ;;
    esac
done

if [ "$RUN_ALL" -eq 1 ]; then
    RUN_CORE=1
    MODULES+=("micro" "helios")
fi

if [ "$RUN_CORE" -eq 1 ]; then
    MODULES+=("designer" "product-designer" "design-method-finder" "hashi-designer" "commit")
fi

has_module() {
    local wanted="$1"
    local module
    for module in "${MODULES[@]}"; do
        if [ "$module" = "$wanted" ]; then
            return 0
        fi
    done
    return 1
}

install_skill_to_dir() {
    local source_dir="$1"
    local dest_dir="$2"

    if [ ! -d "$source_dir" ]; then
        echo "⚠ Missing skill source: $source_dir"
        return 1
    fi

    rm -rf "$dest_dir"
    mkdir -p "$dest_dir"
    cp -R "$source_dir"/. "$dest_dir"/
    echo "✓ Installed $source_dir -> $dest_dir"
}

install_skill() {
    local name="$1"
    local source_dir="skill/$name"

    install_skill_to_dir "$source_dir" ".opencode/skills/$name"

    if [ -d "$HOME/.claude" ]; then
        install_skill_to_dir "$source_dir" "$HOME/.claude/skills/$name"
    fi

    if [ -f "$source_dir/agent.md" ]; then
        mkdir -p .opencode/agents
        cp "$source_dir/agent.md" ".opencode/agents/$name.md"
        echo "✓ Installed OpenCode agent .opencode/agents/$name.md"
    fi
}

install_deps() {
    if [ "$INSTALL_DEPS" -ne 1 ]; then
        echo "⏭ Skipping npm dependencies"
        return
    fi

    if ! command -v npm >/dev/null 2>&1; then
        echo "⏭ npm not found; skipping Storybook/showcase dependencies"
        echo "  Install Node/npm later if you want Storybook, showcase, or mockup builds."
        return
    fi

    echo "Installing npm dependencies..."
    (cd storybook && npm install)
    (cd showcase && npm install)
    echo "✓ Dependencies installed"
}

install_opencode_plugin() {
    if [ "$INSTALL_OPENCODE_PLUGIN" -ne 1 ]; then
        echo "⏭ Skipping OpenCode plugin install"
        return
    fi

    local config_dir="$HOME/.config/opencode"
    local plugins_dir="$config_dir/plugins"

    echo "Installing OpenCode sound plugin..."
    mkdir -p "$plugins_dir"
    cp .opencode/plugins/sound.js "$plugins_dir/sound.js"

    if [ ! -f "$config_dir/package.json" ]; then
        printf '%s\n' '{ "dependencies": { "@opencode-ai/plugin": "1.3.15" } }' > "$config_dir/package.json"
    fi

    (cd "$config_dir" && npm install --silent 2>/dev/null || bun install --silent 2>/dev/null || true)
    echo "✓ Sound plugin installed"
}

install_hcp_ref() {
    if [ "$INSTALL_HCP_REF" -ne 1 ]; then
        echo "⏭ Skipping HCP Terraform UI reference sync"
        return
    fi

    local repo="https://github.com/hashicorp/hcp-tf-ui-for-agents.git"
    local dir="reference/hcp-tf-ui-for-agents"

    echo "Syncing HCP Terraform UI reference docs..."
    mkdir -p reference

    if ! command -v git >/dev/null 2>&1; then
        echo "⏭ git not found; run later: just hcp-ui-ref-sync"
        return
    fi

    if [ -d "$dir/.git" ]; then
        if git -C "$dir" pull --ff-only; then
            echo "✓ Updated $dir"
        else
            echo "⚠ Could not update $dir; run: just hcp-ui-ref-sync"
        fi
    elif [ -d "$dir" ] && [ -n "$(ls -A "$dir" 2>/dev/null || true)" ]; then
        echo "⚠ $dir exists and is not a git checkout; move/remove it, then run: just hcp-ui-ref-sync"
    else
        rm -rf "$dir"
        if git clone "$repo" "$dir"; then
            echo "✓ Cloned $dir"
        else
            echo "⚠ Could not clone $repo; run: just hcp-ui-ref-sync"
        fi
    fi
}

install_qmd() {
    if [ "$INSTALL_QMD" -ne 1 ]; then
        echo "⏭ Skipping QMD bootstrap"
        return
    fi

    echo "Bootstrapping QMD notes-search config..."
    if scripts/qmd-bootstrap.sh; then
        echo "✓ QMD profile bootstrapped for this checkout"
    else
        echo "⚠ QMD profile bootstrap failed; run: just qmd-bootstrap"
    fi

    if ! command -v qmd >/dev/null 2>&1; then
        echo "⏭ qmd CLI not found; config exists but update/embed cannot run yet"
        echo "  Install later: npm install -g @tobilu/qmd"
        echo "  Then run: just qmd-refresh"
    fi
}

install_impeccable() {
    local choice="$INSTALL_IMPECCABLE_CHOICE"

    if has_module "impeccable" && [ -z "$choice" ]; then
        choice=1
    fi

    if [ "$RUN_ALL" -ne 1 ] && ! has_module "impeccable" && [ -z "$choice" ]; then
        echo "⏭ Skipping optional impeccable install"
        echo "  Install later: npx skills add pbakaus/impeccable"
        return
    fi

    if [ -z "$choice" ] && [ -t 0 ]; then
        read -r -p "Install optional external skill 'pbakaus/impeccable'? [y/N] " choice
    fi

    if [[ "${choice:-0}" =~ ^([1Yy]|yes|YES)$ ]]; then
        if command -v npx >/dev/null 2>&1; then
            if npx skills add pbakaus/impeccable; then
                echo "✓ Optional impeccable skill installed"
            else
                echo "⚠ Optional impeccable install failed"
                echo "  Run manually: npx skills add pbakaus/impeccable"
            fi
        else
            echo "⏭ npx not found; run later: npx skills add pbakaus/impeccable"
        fi
    else
        echo "⏭ Skipping optional impeccable install"
        echo "  Install later: npx skills add pbakaus/impeccable"
    fi
}

check_browser_capture() {
    echo "Checking Playwright browser-capture support..."
    if [ -d "$HOME/.claude/skills/dev-browser" ] || [ -d "$HOME/.config/opencode/skills/dev-browser" ]; then
        echo "✓ dev-browser skill detected"
    else
        echo "⏭ dev-browser skill not detected; install separately for live UI capture"
    fi
}

print_banner
echo "Setting up Pocket Product Designer..."
echo ""

if has_module "deps" || { [ "$RUN_ALL" -eq 1 ] && [ "$INSTALL_DEPS" -eq 1 ]; }; then
    install_deps
else
    echo "⏭ Skipping npm dependencies"
fi

mkdir -p .opencode/skills .opencode/agents

for skill in designer product-designer design-method-finder hashi-designer commit; do
    if has_module "$skill"; then
        install_skill "$skill"
    fi
done

if has_module "micro"; then
    install_skill "microinteractions-expert"
fi

if has_module "helios"; then
    install_skill "helios-design-system"
fi

if has_module "opencode-plugin" || [ "$RUN_ALL" -eq 1 ]; then
    install_opencode_plugin
fi

if has_module "hcp-ref" || [ "$RUN_ALL" -eq 1 ]; then
    install_hcp_ref
fi

if has_module "qmd" || [ "$RUN_ALL" -eq 1 ]; then
    install_qmd
fi

check_browser_capture
install_impeccable

echo ""
echo "Setup complete."
echo ""
echo "Common next steps:"
echo "  Open this repo in your preferred LLM/coding agent."
echo "  Recommended if available: opencode"
echo "  Ask: Read this repo and onboard me to PPD."
echo "  Or ask: notes ingest"
echo "  Optional after adding notes: ./scripts/qmd-refresh.sh (or: just qmd-refresh)"
echo "  Preview example: cd showcase && npm run dev (or: just showcase-dev)"
echo "  Optional polished UI craft: ./setup.sh --module impeccable"
