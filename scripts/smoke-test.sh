#!/bin/bash

# 🧪 Production Smoke Test Script
# This script tests critical endpoints after deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PRODUCTION_URL=${PRODUCTION_URL:-"https://your-app.vercel.app"}
TIMEOUT=30
RETRY_COUNT=3

echo -e "${BLUE}🧪 Starting Production Smoke Tests...${NC}"
echo -e "${BLUE}📍 Testing URL: ${PRODUCTION_URL}${NC}"

# Function to test endpoint with retries
test_endpoint() {
    local url=$1
    local description=$2
    local expected_status=${3:-200}
    
    echo -e "${YELLOW}🔍 Testing: ${description}${NC}"
    
    for i in $(seq 1 $RETRY_COUNT); do
        echo -e "${YELLOW}   Attempt ${i}/${RETRY_COUNT}...${NC}"
        
        if response=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$url" 2>/dev/null); then
            if [ "$response" = "$expected_status" ]; then
                echo -e "${GREEN}   ✅ ${description} - Status: ${response}${NC}"
                return 0
            else
                echo -e "${YELLOW}   ⚠️  ${description} - Status: ${response} (expected: ${expected_status})${NC}"
            fi
        else
            echo -e "${YELLOW}   ⚠️  ${description} - Connection failed${NC}"
        fi
        
        if [ $i -lt $RETRY_COUNT ]; then
            echo -e "${YELLOW}   ⏳ Waiting 5 seconds before retry...${NC}"
            sleep 5
        fi
    done
    
    echo -e "${RED}   ❌ ${description} - Failed after ${RETRY_COUNT} attempts${NC}"
    return 1
}

# Function to test page content
test_page_content() {
    local url=$1
    local description=$2
    local expected_content=$3
    
    echo -e "${YELLOW}🔍 Testing content: ${description}${NC}"
    
    if content=$(curl -s --max-time $TIMEOUT "$url" 2>/dev/null); then
        if echo "$content" | grep -q "$expected_content"; then
            echo -e "${GREEN}   ✅ ${description} - Content found${NC}"
            return 0
        else
            echo -e "${RED}   ❌ ${description} - Content not found${NC}"
            return 1
        fi
    else
        echo -e "${RED}   ❌ ${description} - Failed to fetch content${NC}"
        return 1
    fi
}

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0

# Test 1: Homepage availability
if test_endpoint "$PRODUCTION_URL" "Homepage" 200; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Test 2: Homepage content
if test_page_content "$PRODUCTION_URL" "Homepage Content" "TradeSchool"; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Test 3: Road Signs Module
if test_endpoint "$PRODUCTION_URL/signs" "Road Signs Module" 200; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Test 4: CDL Training Module
if test_endpoint "$PRODUCTION_URL/cdl" "CDL Training Module" 200; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Test 5: VR/AR Training Module
if test_endpoint "$PRODUCTION_URL/vr-ar" "VR/AR Training Module" 200; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Test 6: API Health Check (if available)
if test_endpoint "$PRODUCTION_URL/api/health" "API Health Check" 200; then
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}   ⚠️  API Health Check - Not available (optional)${NC}"
fi

# Test 7: Static Assets
if test_endpoint "$PRODUCTION_URL/favicon.ico" "Static Assets" 200; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Test 8: 404 Handling
if test_endpoint "$PRODUCTION_URL/nonexistent-page" "404 Handling" 404; then
    ((TESTS_PASSED++))
else
    ((TESTS_FAILED++))
fi

# Summary
echo -e "\n${BLUE}📊 Smoke Test Summary${NC}"
echo -e "${GREEN}✅ Tests Passed: ${TESTS_PASSED}${NC}"
echo -e "${RED}❌ Tests Failed: ${TESTS_FAILED}${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All smoke tests passed! Production deployment is healthy.${NC}"
    exit 0
else
    echo -e "\n${RED}❌ Some smoke tests failed. Please check the deployment.${NC}"
    exit 1
fi
