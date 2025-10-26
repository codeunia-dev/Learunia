# Cheatsheet Components Debug TODO

## Issues Identified:
1. **Import Path Error**: `src/components/Cheatsheets.tsx` has incorrect import path for Cheatsheet component
2. **Data Inconsistency**: `src/components/Cheatsheet.tsx` uses hardcoded data instead of centralized `subjects.ts`
3. **Data Structure Mismatch**: Hardcoded data doesn't match the `Subject` interface structure
4. **Missing Dependencies**: Need to verify Hero and SubjectCard imports work correctly

## Debug Steps:
- [ ] Fix Cheatsheets.tsx import path issue
- [ ] Refactor Cheatsheet.tsx to use centralized subjects data
- [ ] Update data structure to match Subject interface
- [ ] Fix categorization logic for centralized data
- [ ] Update href paths to match routing structure
- [ ] Verify component dependencies (Hero, SubjectCard)
- [ ] Test component rendering and navigation
- [ ] Verify responsive design works correctly

## Files to modify:
- `src/components/Cheatsheets.tsx`
- `src/components/Cheatsheet.tsx`
