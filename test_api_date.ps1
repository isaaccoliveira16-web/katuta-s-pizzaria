# API Test Script for Katuta Dashboard
# Tests if the date parameter correctly routes to the specific day sheet

$url = "http://localhost:5678/webhook/dashboard-data"

# Calculate next Friday for testing
$d = Get-Date
while ($d.DayOfWeek -ne 'Friday') { $d = $d.AddDays(1) }
if ($d.Date -eq (Get-Date).Date) { $d = $d.AddDays(7) } # Ensure it's future
$testDate = $d.ToString("yyyy-MM-dd")

Write-Host "---------------------------------------------------" -ForegroundColor Cyan
Write-Host "TESTING DATE: $testDate (Next Friday)" -ForegroundColor Cyan
Write-Host "EXPECTED SHEET: Reservas_Sexta" -ForegroundColor Cyan
Write-Host "---------------------------------------------------"

$body = @{
    action = "update_status"
    id = "TEST-VERIFY-DATE-FIX"
    status = "CANCELADA"
    date = $testDate
    sheet_reservas = "Reservas_Sexta" # Passing explicit just in case, but we want to see what logic derives
} | ConvertTo-Json

try {
    Write-Host "Sending POST request..."
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    
    Write-Host "Response Received!" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 5)
} catch {
    Write-Host "❌ ERROR: Could not connect to API at $url" -ForegroundColor Red
    Write-Host "Details: $_"
    Write-Host "Make sure n8n is running."
}
