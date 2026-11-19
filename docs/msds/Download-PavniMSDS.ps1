# ==============================================================================
# Download-PavniMSDS.ps1
# Pavni Chemicals — MSDS Downloader
# Scans pavnichemicals.com product pages + downloads from manufacturer portals
# Run in PowerShell (Admin recommended)
# Author: Generated for Pavni Chemicals Digital Project
# ==============================================================================

$OutputDir = "C:\Users\jayde\.gemini\antigravity\scratch\pavni_chemicals\docs\msds"
$LogFile   = "$OutputDir\download_log.txt"
$UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

# ── Create output folder ──────────────────────────────────────────────────────
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    Write-Host "✅ Created folder: $OutputDir" -ForegroundColor Green
} else {
    Write-Host "📁 Folder exists: $OutputDir" -ForegroundColor Cyan
}

function Write-Log {
    param([string]$Msg, [string]$Color = "White")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Line = "[$Timestamp] $Msg"
    Write-Host $Line -ForegroundColor $Color
    Add-Content -Path $LogFile -Value $Line
}

function Download-File {
    param([string]$Url, [string]$DestPath, [string]$Label)
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", $UserAgent)
        $wc.DownloadFile($Url, $DestPath)
        $size = [math]::Round((Get-Item $DestPath).Length / 1KB, 1)
        Write-Log "  ✅ Downloaded: $Label ($size KB)" "Green"
        return $true
    } catch {
        Write-Log "  ❌ Failed: $Label — $($_.Exception.Message)" "Red"
        if (Test-Path $DestPath) { Remove-Item $DestPath -Force }
        return $false
    }
}

Write-Log "======================================================" "Cyan"
Write-Log " PAVNI CHEMICALS — MSDS DOWNLOAD SESSION STARTED" "Cyan"
Write-Log "======================================================" "Cyan"

# ==============================================================================
# SECTION 1: Scan pavnichemicals.com product pages for any MSDS PDF links
# ==============================================================================
Write-Log ""
Write-Log "── SECTION 1: Scanning pavnichemicals.com product pages ──" "Yellow"

$BaseUrl     = "https://www.pavnichemicals.com"
$ProductIds  = 1..43
$FoundOnSite = 0

foreach ($id in $ProductIds) {
    $PageUrl = "$BaseUrl/product-detail.html?id=$id"
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", $UserAgent)
        $html = $wc.DownloadString($PageUrl)

        # Find any href pointing to PDF or MSDS
        $matches = [regex]::Matches($html, 'href=["\x27]([^"]+(?:msds|MSDS|\.pdf|\.PDF)[^"]*)["\x27]')
        foreach ($m in $matches) {
            $href = $m.Groups[1].Value
            if ($href -eq "#" -or $href -eq "") { continue }
            $fullUrl = if ($href -match "^http") { $href } else { "$BaseUrl/$($href.TrimStart('/'))" }
            $fileName = "pavni_site_product${id}_msds.pdf"
            $destPath = Join-Path $OutputDir $fileName
            Write-Log "  Found PDF link on product $id : $fullUrl" "Cyan"
            $ok = Download-File -Url $fullUrl -DestPath $destPath -Label "Product $id MSDS"
            if ($ok) { $FoundOnSite++ }
        }
    } catch {
        # silent — page may not exist
    }
}

if ($FoundOnSite -eq 0) {
    Write-Log "  ⚠️  No MSDS PDFs found hosted on pavnichemicals.com" "Yellow"
    Write-Log "  (All MSDS buttons are placeholder '#' links — files not yet uploaded)" "Yellow"
}

# ==============================================================================
# SECTION 2: Download official MSDS from manufacturer portals
# These are the primary brand sources for Pavni's product portfolio
# ==============================================================================
Write-Log ""
Write-Log "── SECTION 2: Downloading from manufacturer MSDS portals ──" "Yellow"

$ManufacturerMSDS = @(

    # ── GRASIM / ADITYA BIRLA (Primary Dealership) ──────────────────────────
    @{
        Label    = "Grasim_Caustic_Soda_Lye_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/Caustic_Soda_Lye_SDS.pdf"
        Filename = "Grasim_Caustic_Soda_Lye_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Caustic_Soda_Flakes_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/Caustic_Soda_Solid_SDS.pdf"
        Filename = "Grasim_Caustic_Soda_Flakes_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Hydrochloric_Acid_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/HCL_SDS.pdf"
        Filename = "Grasim_Hydrochloric_Acid_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Methylene_Chloride_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-11/Methylene_Chloride_SDS.pdf"
        Filename = "Grasim_Methylene_Chloride_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Chloroform_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-11/Chloroform_SDS.pdf"
        Filename = "Grasim_Chloroform_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Benzyl_Chloride_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-11/Benzyl_Chloride_SDS.pdf"
        Filename = "Grasim_Benzyl_Chloride_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Benzyl_Alcohol_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-11/Benzyl_Alcohol_SDS.pdf"
        Filename = "Grasim_Benzyl_Alcohol_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Benzaldehyde_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-11/Benzaldehyde_SDS.pdf"
        Filename = "Grasim_Benzaldehyde_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Caustic_Potash_Lye_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/Caustic_Potash_Lye_SDS.pdf"
        Filename = "Grasim_Caustic_Potash_Lye_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Caustic_Potash_Flakes_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/Caustic_Potash_Solid_SDS.pdf"
        Filename = "Grasim_Caustic_Potash_Flakes_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Potassium_Carbonate_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/Potassium_Carbonate_SDS.pdf"
        Filename = "Grasim_Potassium_Carbonate_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Hydrogen_Peroxide_50pct_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-08/Hydrogen_Peroxide_50_SDS.pdf"
        Filename = "Grasim_Hydrogen_Peroxide_50pct_MSDS.pdf"
    },
    @{
        Label    = "Grasim_Aluminium_Chloride_MSDS"
        Url      = "https://www.adityabirlachemicals.com/sites/default/files/2021-11/Aluminium_Chloride_SDS.pdf"
        Filename = "Grasim_Aluminium_Chloride_MSDS.pdf"
    },

    # ── GNFC (Phosphoric Acid, Hydrogen Peroxide) ────────────────────────────
    @{
        Label    = "GNFC_Phosphoric_Acid_Tech_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/phosphoric_acid_msds.pdf"
        Filename = "GNFC_Phosphoric_Acid_Technical_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Phosphoric_Acid_Food_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/phosphoric_acid_food_grade_msds.pdf"
        Filename = "GNFC_Phosphoric_Acid_Food_Grade_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Hydrogen_Peroxide_35pct_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/hydrogen_peroxide_35_msds.pdf"
        Filename = "GNFC_Hydrogen_Peroxide_35pct_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Hydrogen_Peroxide_50pct_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/hydrogen_peroxide_50_msds.pdf"
        Filename = "GNFC_Hydrogen_Peroxide_50pct_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Toluene_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/toluene_msds.pdf"
        Filename = "GNFC_Toluene_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Acetic_Acid_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/acetic_acid_msds.pdf"
        Filename = "GNFC_Acetic_Acid_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Formic_Acid_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/formic_acid_msds.pdf"
        Filename = "GNFC_Formic_Acid_MSDS.pdf"
    },
    @{
        Label    = "GNFC_Ethyl_Acetate_MSDS"
        Url      = "https://www.gnfc.in/products/pdf/msds/ethyl_acetate_msds.pdf"
        Filename = "GNFC_Ethyl_Acetate_MSDS.pdf"
    },

    # ── GACL (Gujarat Alkalies) ───────────────────────────────────────────────
    @{
        Label    = "GACL_Caustic_Soda_Lye_MSDS"
        Url      = "https://www.gacl.com/images/msds/CausticSodaLye.pdf"
        Filename = "GACL_Caustic_Soda_Lye_MSDS.pdf"
    },
    @{
        Label    = "GACL_Caustic_Soda_Flakes_MSDS"
        Url      = "https://www.gacl.com/images/msds/CausticSodaFlakes.pdf"
        Filename = "GACL_Caustic_Soda_Flakes_MSDS.pdf"
    },
    @{
        Label    = "GACL_Hydrochloric_Acid_MSDS"
        Url      = "https://www.gacl.com/images/msds/HCL.pdf"
        Filename = "GACL_Hydrochloric_Acid_MSDS.pdf"
    },
    @{
        Label    = "GACL_Liquid_Chlorine_MSDS"
        Url      = "https://www.gacl.com/images/msds/LiquidChlorine.pdf"
        Filename = "GACL_Liquid_Chlorine_MSDS.pdf"
    },
    @{
        Label    = "GACL_Sodium_Hypochlorite_MSDS"
        Url      = "https://www.gacl.com/images/msds/SodiumHypochlorite.pdf"
        Filename = "GACL_Sodium_Hypochlorite_MSDS.pdf"
    },
    @{
        Label    = "GACL_Hydrogen_Peroxide_MSDS"
        Url      = "https://www.gacl.com/images/msds/HydrogenPeroxide.pdf"
        Filename = "GACL_Hydrogen_Peroxide_MSDS.pdf"
    },
    @{
        Label    = "GACL_PAC_MSDS"
        Url      = "https://www.gacl.com/images/msds/PAC.pdf"
        Filename = "GACL_Poly_Aluminium_Chloride_MSDS.pdf"
    },

    # ── DCW Limited (Soda Ash, Sodium Bicarbonate) ────────────────────────────
    @{
        Label    = "DCW_Soda_Ash_Light_MSDS"
        Url      = "https://www.dcwltd.com/msds/SodaAshLight.pdf"
        Filename = "DCW_Soda_Ash_Light_MSDS.pdf"
    },
    @{
        Label    = "DCW_Soda_Ash_Dense_MSDS"
        Url      = "https://www.dcwltd.com/msds/SodaAshDense.pdf"
        Filename = "DCW_Soda_Ash_Dense_MSDS.pdf"
    },
    @{
        Label    = "DCW_Sodium_Bicarbonate_MSDS"
        Url      = "https://www.dcwltd.com/msds/SodiumBicarbonate.pdf"
        Filename = "DCW_Sodium_Bicarbonate_MSDS.pdf"
    },

    # ── GHCL (Soda Ash, Sodium Bicarbonate) ──────────────────────────────────
    @{
        Label    = "GHCL_Soda_Ash_MSDS"
        Url      = "https://www.ghcl.co.in/msds/soda-ash-msds.pdf"
        Filename = "GHCL_Soda_Ash_MSDS.pdf"
    },
    @{
        Label    = "GHCL_Sodium_Bicarbonate_MSDS"
        Url      = "https://www.ghcl.co.in/msds/sodium-bicarbonate-msds.pdf"
        Filename = "GHCL_Sodium_Bicarbonate_MSDS.pdf"
    },

    # ── Deepak Nitrite (Sodium Nitrite/Nitrate) ───────────────────────────────
    @{
        Label    = "Deepak_Sodium_Nitrite_MSDS"
        Url      = "https://www.deepaknitrite.com/pdf/msds/sodium-nitrite-msds.pdf"
        Filename = "Deepak_Sodium_Nitrite_MSDS.pdf"
    },
    @{
        Label    = "Deepak_Sodium_Nitrate_MSDS"
        Url      = "https://www.deepaknitrite.com/pdf/msds/sodium-nitrate-msds.pdf"
        Filename = "Deepak_Sodium_Nitrate_MSDS.pdf"
    },

    # ── Generic / Open MSDS sources (fallback for remaining products) ─────────
    @{
        Label    = "Sulphuric_Acid_MSDS"
        Url      = "https://www.fishersci.com/store/msds?partNumber=A300212&productDescription=SULFURIC+ACID&vendorId=VN00033897&countryCode=US&language=en"
        Filename = "Sulphuric_Acid_MSDS.pdf"
    },
    @{
        Label    = "Acetone_MSDS"
        Url      = "https://fscimage.fishersci.com/msds/11490.htm"
        Filename = "Acetone_MSDS.pdf"
    },
    @{
        Label    = "IPA_Isopropyl_Alcohol_MSDS"
        Url      = "https://www.fishersci.com/store/msds?partNumber=BP26321&productDescription=ISOPROPYL+ALCOHOL&vendorId=VN00033897&countryCode=US&language=en"
        Filename = "IPA_Isopropyl_Alcohol_MSDS.pdf"
    },
    @{
        Label    = "Ferric_Chloride_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/Product_Information_Sheet/1/157740pis.pdf"
        Filename = "Ferric_Chloride_MSDS.pdf"
    },
    @{
        Label    = "Ferrous_Sulphate_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/1/f3935sds.pdf"
        Filename = "Ferrous_Sulphate_MSDS.pdf"
    },
    @{
        Label    = "Hydrazine_Hydrate_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/2/53612sds.pdf"
        Filename = "Hydrazine_Hydrate_MSDS.pdf"
    },
    @{
        Label    = "Sulphamic_Acid_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/2/481602sds.pdf"
        Filename = "Sulphamic_Acid_MSDS.pdf"
    },
    @{
        Label    = "Calcium_Chloride_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/1/223506sds.pdf"
        Filename = "Calcium_Chloride_MSDS.pdf"
    },
    @{
        Label    = "Sodium_Acetate_Anhydrous_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/1/s8750sds.pdf"
        Filename = "Sodium_Acetate_Anhydrous_MSDS.pdf"
    },
    @{
        Label    = "Benzyl_Acetate_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/1/108006sds.pdf"
        Filename = "Benzyl_Acetate_MSDS.pdf"
    },
    @{
        Label    = "MEG_Mono_Ethylene_Glycol_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/1/324558sds.pdf"
        Filename = "MEG_Monoethylene_Glycol_MSDS.pdf"
    },
    @{
        Label    = "Stable_Bleaching_Powder_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/2/215619sds.pdf"
        Filename = "Stable_Bleaching_Powder_MSDS.pdf"
    },
    @{
        Label    = "Hydrated_Lime_MSDS"
        Url      = "https://www.sigmaaldrich.com/content/dam/sigma-aldrich/docs/Sigma-Aldrich/SDS/2/306886sds.pdf"
        Filename = "Hydrated_Lime_MSDS.pdf"
    }
)

$Downloaded   = 0
$Failed       = 0
$FailedItems  = @()

foreach ($item in $ManufacturerMSDS) {
    $destPath = Join-Path $OutputDir $item.Filename
    Write-Log "Downloading: $($item.Label)" "White"
    $ok = Download-File -Url $item.Url -DestPath $destPath -Label $item.Label
    if ($ok) { $Downloaded++ } else { $Failed++; $FailedItems += $item.Label }
}

# ==============================================================================
# SECTION 3: Summary & next-step instructions
# ==============================================================================
Write-Log ""
Write-Log "======================================================" "Cyan"
Write-Log " DOWNLOAD SUMMARY" "Cyan"
Write-Log "======================================================" "Cyan"
Write-Log "  ✅ Successfully downloaded : $Downloaded files" "Green"
Write-Log "  ❌ Failed / Not found      : $Failed files" "Red"
Write-Log "  📁 Saved to                : $OutputDir" "Cyan"

if ($FailedItems.Count -gt 0) {
    Write-Log ""
    Write-Log "  Failed items (get manually from manufacturer portals):" "Yellow"
    foreach ($f in $FailedItems) { Write-Log "    - $f" "Yellow" }
}

Write-Log ""
Write-Log "  MANUAL MSDS SOURCES:" "Cyan"
Write-Log "  Grasim/Aditya Birla : https://www.adityabirlachemicals.com/resource-center/sds" "White"
Write-Log "  GACL                : https://www.gacl.com/msds.aspx" "White"
Write-Log "  GNFC                : https://www.gnfc.in/products.aspx" "White"
Write-Log "  DCW Ltd             : https://www.dcwltd.com/technical-information" "White"
Write-Log "  GHCL                : https://www.ghcl.co.in/chemical-products" "White"
Write-Log "  Deepak Nitrite      : https://www.deepaknitrite.com/products" "White"
Write-Log "  Sigma-Aldrich       : https://www.sigmaaldrich.com/IN/en" "White"
Write-Log ""
Write-Log "  NEXT STEP — Upload to website:" "Cyan"
Write-Log "  Place downloaded PDFs in: /assets/msds/ on pavnichemicals.com" "White"
Write-Log "  Then update product-detail.html href from '#' to correct path" "White"
Write-Log "  e.g.  href='/assets/msds/Grasim_Caustic_Soda_Lye_MSDS.pdf'" "White"
Write-Log "======================================================" "Cyan"
