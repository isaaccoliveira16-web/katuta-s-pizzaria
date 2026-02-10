$json = Get-Content "c:/Users/isaac/OneDrive/Desktop/Antigravity 01/temp_workflow.json" -Raw
$headers = @{
    "X-N8N-API-KEY" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZmYxYTI1YS01NjVmLTQzZGUtYTk0Yi0xYzAxYWM2MDY5ZTMiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzcwMjk3MjUwLCJleHAiOjE3NzI4NTI0MDB9.imRmcXfU-t7THXvM5dhNoVP765J8kKbz-75zQmIU9rc"
}
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5678/api/v1/workflows" -Method Post -Body $json -ContentType "application/json" -Headers $headers
    Write-Host "Success: Workflow Created with ID $($response.id)"
} catch {
    Write-Error $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        Write-Error $reader.ReadToEnd()
    }
    exit 1
}
