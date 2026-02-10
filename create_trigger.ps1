$headers = @{
    "X-N8N-API-KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmYxYTI1YS01NjVmLTQzZGUtYTk0Yi0xYzAxYWM2MDY5ZTMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzcwMjk3MjUwLCJleHAiOjE3NzI4NTI0MDB9.imRmcXfU-t7THXvM5dhNoVP765J8kKbz-75zQmIU9rc"
}

$body = @{
  "name" = "Antigravity Test Simple"
  "nodes" = @(
    @{
      "parameters" = @{}
      "id" = "trigger-1"
      "name" = "Manual Trigger"
      "type" = "n8n-nodes-base.manualTrigger"
      "typeVersion" = 1
      "position" = @(460, 460)
    }
  )
  "connections" = @{}
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5678/api/v1/workflows" -Method Post -Body $body -ContentType "application/json" -Headers $headers
    Write-Host "Success! Created Workflow ID: $($response.id)"
} catch {
    Write-Error $_.Exception.Message
    if ($_.Exception.Response) {
       $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
       Write-Error $reader.ReadToEnd()
    }
    exit 1
}
