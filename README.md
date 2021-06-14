Get the Developer Console/Errors in the VSCode Output.

Place this into your autoexec folder named whatever you like.

# Synapse Only

```lua
getgenv()["WebsocketSendErrorSettings"] = {
    ["ConsoleRedirection"] = false,
    ["ErrorRedirection"] = true
}

if syn and syn.cache_replace and syn.cache_invalidate and syn.set_thread_identity and syn.get_thread_identity then
        local WebSocket = syn.websocket.connect("ws://localhost:34523/")
        game:GetService("LogService").MessageOut:Connect(function(m)
            if getgenv()["WebsocketSendErrorSettings"]["ConsoleRedirection"] == true then
                WebSocket:Send(m)
            end
        end)
        game.ScriptContext.ErrorDetailed:Connect(function(message)
            if getgenv()["WebsocketSendErrorSettings"]["ErrorRedirection"] == true then
                WebSocket:Send(message:sub(1, 1) .. utf8.char(8203) .. message:sub(2))
            end
        end)
end
```