<Stack spacing={2} direction={"column"}>
  {/* Total Spending */}

  <AccountSelector
    filteredAccounts={filteredAccounts}
    activeAccount={activeAccount ?? ""}
    setActiveItem={setActiveItem}
    chipRefs={chipRefs}
  />
  {/* Account Check For Category Start */}
  {filteredCategories.length > 0 ? (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.bgColorPrimary.light,
          color: theme.palette.bgColorPrimary.contrastText,
          borderRadius: 4,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" fontWeight={600} color="primary.light">
          Total Spending
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {currencyFormatter(totalSpendingAccount(filteredTransactions))}
        </Typography>
      </Box>
      {/* Spending Button */}
      <Stack direction="row" spacing={2} justifyContent={"center"}>
        <Button
          onClick={() => setOpenSpendingGoals(true)}
          startIcon={<FlagOutlined color="primary" />}
          fullWidth
          sx={{
            backgroundColor: theme.palette.bgColorPrimary.light,
            color: theme.palette.bgColorPrimary.contrastText,
            borderRadius: 3,
            textTransform: "none",
          }}
          variant="outlined"
        >
          Spending Goals
        </Button>
        <Button
          onClick={() => setOpenSpendingReport(true)}
          startIcon={<InsertChartOutlined color="primary" />}
          fullWidth
          sx={{
            backgroundColor: theme.palette.bgColorPrimary.light,
            color: theme.palette.bgColorPrimary.contrastText,
            borderRadius: 3,
            textTransform: "none",
          }}
          variant="outlined"
        >
          Spending Report
        </Button>
      </Stack>
      {/* Category Breakdown */}
      <Suspense fallback={<Loading />}>
        <CategoryBreakdown />
      </Suspense>
      {/* Spending History */}
      <Suspense fallback={<Loading />}>
        <SpendingHistory
          setOpenAdd={setOpenAdd}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setDeleteDialogProps={setDeleteDialogProps}
          setEditSpending={setEditSpending}
        />
      </Suspense>
    </>
  ) : (
    <Typography>Please add category before using this apps!</Typography>
  )}
  {/* Account Check For Category End */}
  {/* Add Button */}
  <SpeedDial
    ariaLabel="SpeedDial tooltip example"
    sx={{ position: "absolute", bottom: 88, right: 24 }}
    icon={<SpeedDialIcon />}
    {...speedDialProps}
  >
    {actions.map((action) => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        slotProps={{
          tooltip: {
            open: true,
            title: action.name,
          },
        }}
        onClick={action.control}
      />
    ))}
  </SpeedDial>

  {/* Dialog Boxes */}
  <Suspense fallback={<Loading />}>
    <AddCategory
      open={openAddCategory}
      setOpen={setOpenAddCategory}
      setOpenDeleteDialog={setOpenDeleteDialog}
      setDeleteDialogProps={setDeleteDialogProps}
    />
    {filteredCategories.length > 0 && (
      <>
        <AddSpending open={openAdd} setOpen={setOpenAdd} {...editSpending} />
        <AddBudget open={openSpendingBudget} setOpen={setOpenSpendingBudget} />
      </>
    )}

    <SpendingGoals open={openSpendingGoals} setOpen={setOpenSpendingGoals} />
    <AddAccount
      open={openAddAccount}
      setOpen={setOpenAddAccount}
      setOpenDeleteDialog={setOpenDeleteDialog}
      setDeleteDialogProps={setDeleteDialogProps}
    />
    <SpendingReport open={openSpendingReport} setOpen={setOpenSpendingReport} />
    <DeleteConfirmation
      open={openDeleteDialog}
      setOpen={setOpenDeleteDialog}
      setDeleteDialogProps={setDeleteDialogProps}
      {...deleteDialogProps}
    />
  </Suspense>
  {/*
   */}
</Stack>;
