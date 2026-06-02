# Status Bar Feature

[English](STATUS_BAR.md) | [中文](STATUS_BAR_zh.md)

## Overview

Ai Agent now includes a real-time status bar that displays key information about your session at a glance.

## Status Bar Components

The status bar displays multiple key metrics:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 3 │ 🟢 Context: 45% │ 💬 Msgs: 67 │ 🎯 Skills: 3 │ 🤖 Agents: 2      │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 1. MCP Connection Status

**Icon**: 🔌 (connected) or ⚪ (disconnected)  
**Color**: 
- **Green**: One or more MCP servers connected
- **Gray**: No MCP servers connected

**Example**:
- `🔌 MCP: 3` - 3 MCP servers connected
- `⚪ MCP: 0` - No MCP servers

### 2. Context Usage (Compression Status)

**Icon & Color**:
- 🟢 **Green (0-74%)**: Normal - plenty of context space available
- 🟡 **Yellow (75-91%)**: Warning - approaching limit
- 🔴 **Red (92-100%)**: Critical - auto-compression will trigger soon

**Display**: Shows percentage of context window used

**Examples**:
- `🟢 Context: 15%` - Plenty of space
- `🟡 Context: 78%` - Warning threshold
- `🔴 Context: 93%` - Critical (auto-compress imminent)

### 3. Message Count

**Icon**: 💬  
**Color**: Cyan  
**Display**: Total number of messages in conversation history

**Example**:
- `💬 Msgs: 45` - 45 messages in history

### 4. Skills Count

**Icon**: 🎯  
**Color**: Blue  
**Display**: Number of installed skills (only shown when skills exist)

**Example**:
- `🎯 Skills: 3` - 3 skills installed

### 5. Agents Count

**Icon**: 🤖  
**Color**: Blue  
**Display**: Number of custom agents (only shown when custom agents exist)

**Example**:
- `🤖 Agents: 2` - 2 custom agents created

## When Status Bar Appears

The status bar is displayed:

1. **On startup** - Shows initial state
2. **After every command** - Updates after `/help`, `/stats`, `/compact`, etc.
3. **After AI responses** - Updates after each conversation turn
4. **After special operations** - Updates after compression, reset, etc.

## Visual Examples

### Healthy Session
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 2 │ 🟢 Context: 35% │ 💬 Messages: 20                                │
└──────────────────────────────────────────────────────────────────────────────┘
```
Everything is normal, plenty of context space.

### Warning State
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 2 │ 🟡 Context: 78% │ 💬 Messages: 85                                │
└──────────────────────────────────────────────────────────────────────────────┘
```
Context usage is high. Consider using `/compact` to free up space.

### Critical State
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 1 │ 🔴 Context: 93% │ 💬 Messages: 120                               │
└──────────────────────────────────────────────────────────────────────────────┘
```
Context is nearly full. Auto-compression will trigger on next query.

### No MCP Servers
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ⚪ MCP: 0 │ 🟢 Context: 12% │ 💬 Messages: 8                                 │
└──────────────────────────────────────────────────────────────────────────────┘
```
Working without MCP servers (base functionality only).

## Responsive Design

The status bar automatically adjusts to your terminal width:
- **Narrow terminals**: Content fits with appropriate padding
- **Wide terminals**: Expands to fill the width
- **Minimum width**: 60 characters recommended

## Color Coding Logic

### Context Usage Colors

```
 0% ─────────────────► 74%    🟢 Green (Normal)
75% ─────────────────► 91%    🟡 Yellow (Warning)
92% ─────────────────► 100%   🔴 Red (Critical)
```

The thresholds align with the auto-compression trigger at 92%.

## Integration with Context Compression

The status bar works seamlessly with context compression:

1. **Before compression**: Shows 🔴 at 92%+
2. **During compression**: System displays compression progress
3. **After compression**: Status bar shows reduced percentage and message count

### Example: Compression Cycle

**Before**:
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 2 │ 🔴 Context: 93% │ 💬 Messages: 120                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

*[Auto-compression triggers]*

**After**:
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 2 │ 🟢 Context: 4% │ 💬 Messages: 2                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Testing the Status Bar

Run the test script to see all states:

```bash
node test-status-bar.js
```

This demonstrates:
- Different connection states
- All color thresholds
- Animated progression from 0% to 100%

## Technical Details

### Implementation

- **File**: `src/utils/ui.ts`
- **Function**: `printStatusBar(mcpServerCount, contextPercent, messageCount)`
- **Update Function**: `updateStatusBar()` for in-place updates

### Terminal Codes Used

- Box drawing characters: `┌─┐└┘│`
- ANSI escape codes for colors
- Automatic width calculation based on `process.stdout.columns`

### Performance

- Minimal overhead (< 1ms to render)
- No network calls
- Updates only on state changes
- Efficient terminal rendering

## Tips

1. **Monitor context usage**: Watch for 🟡 yellow to know when to compact
2. **MCP status**: Verify your MCP servers are connected (🔌 green)
3. **Message count**: Track conversation length at a glance
4. **Use /stats**: For detailed context statistics beyond the status bar

## Related Commands

- `/stats` - Detailed context usage statistics
- `/compact` - Manual context compression
- `/reset` - Clear all history
- `/help` - Show all available commands

## Troubleshooting

### Status bar not showing
- Ensure terminal width is at least 60 characters
- Check that output is going to a TTY (not piped)

### Incorrect MCP count
- MCP initialization may have failed
- Check MCP configuration in `.mcp.json`

### Context percentage seems wrong
- Token estimation uses heuristics (~0.25 tokens/char)
- Actual usage may vary ±10%
- Use `/stats` for detailed breakdown

## Future Enhancements

Planned improvements:
- [ ] Token rate indicator (tokens/minute)
- [ ] Cost estimation display
- [ ] Model indicator (which model is active)
- [ ] Network latency indicator
- [ ] Customizable status bar components

## Feedback

The status bar is designed to provide at-a-glance information without cluttering the interface. If you have suggestions for improvements, please open an issue!

